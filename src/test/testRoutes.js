const { Router } = require('express');
const { addTestString, getTestString, testLandingPage } = require('./testControllers');

const testRouter = Router();

testRouter.get('/', testLandingPage);
testRouter.post('/test', addTestString);
testRouter.put('/test', getTestString);

module.exports = testRouter;