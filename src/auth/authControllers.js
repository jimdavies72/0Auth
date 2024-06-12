const passport = require('passport');
const OpenIDConnectStrategy = require("passport-openidconnect");
const qs = require("querystring");

passport.use(
  new OpenIDConnectStrategy(
    {
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      authorizationURL: `https://${process.env.AUTH0_DOMAIN}/authorize`,
      tokenURL: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      userInfoURL: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect",
      scope: ["profile"],
    },
    (verify = (issuer, profile, cb) => {
      return cb(null, profile);
    })
  )
);

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

exports.login = (req, res, next) => {
  try {
    passport.authenticate('openidconnect')(req, res, next);
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

exports.logout = (req, res, next) => {
  try {
    app.use(passport.authenticate("openidconnect"));
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      const params = {
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: `${process.env.HOST}:${process.env.PORT}/`,
      };

      res.redirect(
        `https://${process.env.AUTH0_DOMAIN}/v2/logout?${qs.stringify(params)}`
      );
    });
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

exports.redirect = (req, res, next) => {
  try {
    passport.authenticate("openidconnect", {
      successRedirect: "/test/loggedin",
      failureRedirect: "/login",
    })(req, res, next);
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}