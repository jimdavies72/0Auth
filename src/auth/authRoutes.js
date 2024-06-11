const passport = require('passport');
const OpenIDConnectStrategy = require("passport-openidconnect");
const qs = require('querystring')
const { Router } = require('express');
const authRouter = Router();
const { login, logout, redirect } = require('./authControllers');

passport.use(new OpenIDConnectStrategy({
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  authorizationURL: `https://${process.env.AUTH0_DOMAIN}/authorize`,
  tokenURL: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
  userInfoURL: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: '/oauth2/redirect',
  scope: [ 'profile']
}, verify = (issuer, profile, cb) => {
  return cb(null, profile)  
}));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, {
      id: user.id,
      username: user.username,
      name: user.displayName,
    });
  });
});
      
passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

authRouter.get('/login', login);
authRouter.get('/oauth2/redirect', redirect);
authRouter.post('/logout', logout)

module.exports = authRouter;