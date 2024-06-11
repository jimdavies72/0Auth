const { Router } = require('express');
const { addTestString, getTestString } = require('./testControllers');

const testRouter = Router();

testRouter.post('/test', addTestString);
testRouter.get('/test', getTestString);

module.exports = testRouter;