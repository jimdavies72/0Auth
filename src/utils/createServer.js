require("dotenv").config();
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const testRouter = require('../test/testRoutes');
const unmatchedRouter = require("../unmatched/unmatchedRoutes");


exports.createServer = () => {
  app = express();
  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(testRouter);
  //TODO: add new routes

  //default for unmatched routes
  app.use(unmatchedRouter);

  return app;
}