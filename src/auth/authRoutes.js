const { Router } = require('express');
const authRouter = Router();
const { setHeaders } = require('../middleware');
const { login, logout, redirect } = require('./authControllers');

authRouter.get('/login', login);
authRouter.get("/", redirect);
authRouter.get("/logout", logout);

module.exports = authRouter;