const { Router } = require('express');
const authRouter = Router();
const { isNotAuthenticated } = require('../middleware');
const { login, logout, redirect } = require('./authControllers');

authRouter.get('/login',isNotAuthenticated, login);
authRouter.get('/oauth2/redirect', redirect);
authRouter.get('/logout', logout);

module.exports = authRouter;