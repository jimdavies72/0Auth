const passport = require("passport");
const jwt = require("jsonwebtoken");
const qs = require("querystring");

exports.login = (req, res, next) => {
  try {
    passport.authenticate("openidconnect")(req, res, next);
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
        returnTo: `${process.env.HOST}:${process.env.CLIENT_PORT}/`,
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
      successRedirect: "/",
      failureRedirect: "/login",
    })(req, res, next);
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}