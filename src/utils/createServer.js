require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require('passport');
const logger = require('morgan');
const cors = require('cors');
const testRouter = require('../test/testRoutes');
const authRouter = require('../auth/authRoutes');
const todoRouter = require('../todo/todoRoutes');
const unmatchedRouter = require("../unmatched/unmatchedRoutes");

exports.createServer = () => {
  app = express();
  const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'auth0Sessions'
  })

  store.on('error', (error) => {
    console.log(error.message);
  });

  app.use(express.json());
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(session({
     secret: process.env.SECRET, 
     resave: false, 
     saveUninitialized: true,
     store: store
  }));
  app.use(passport.authenticate('session'));

  app.use(authRouter);
  app.use(todoRouter);
  app.use(testRouter);
  //TODO: add new routes here:

  //default for unmatched routes
  app.use(unmatchedRouter);

  return app;
}