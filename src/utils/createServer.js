require("dotenv").config();
const path = require("path");
const passport = require("../middleware/passport");
const express = require("express");
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const logger = require('morgan');
const cors = require('cors');
const helmet = require("helmet");
const hpp = require("hpp");
const csurf = require('csurf');
const rateLimit = require('express-rate-limit');
const testRouter = require('../test/testRoutes');
const authRouter = require('../auth/authRoutes');
const todoRouter = require('../todo/todoRoutes');
const unmatchedRouter = require("../unmatched/unmatchedRoutes");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

exports.createServer = () => {
  app = express();
  app.use(logger('dev'));
  app.use(express.json());
  
  const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'auth0Sessions'
  })

  store.on('error', (error) => {
    console.log(error.message);
  });

  // Set security configs
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  app.use(hpp());
  app.use(cors());
  app.use(limiter);
  
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: true,
      store: store,
    })
  );
  app.use(passport.initialize());
  app.use(passport.authenticate('session'));

  app.use(csurf());

  app.use(authRouter);
  app.use(todoRouter);
  app.use(testRouter);
  //TODO: add new routes here:

  //default for unmatched routes
  app.use(unmatchedRouter);

  return app;
}