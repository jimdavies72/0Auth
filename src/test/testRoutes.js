const { Router } = require('express');
const { addTestString, getTestString, testLandingPage, testLoggedInPage, testLoggedOutPage } = require('./testControllers');
const { isAuthenticated } = require('../middleware');

const testRouter = Router();

testRouter.get('/test/loggedin', testLoggedInPage );
testRouter.get('/test/loggedout', testLoggedOutPage)
testRouter.get('/', testLandingPage);
testRouter.post('/test', isAuthenticated, addTestString);
testRouter.put('/test', getTestString);

module.exports = testRouter;