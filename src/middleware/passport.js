const passport = require("passport");
const OpenIDConnectStrategy = require("passport-openidconnect");
const JwtStrategy = require("passport-jwt").Strategy;

const openIdConnectStrategy = new OpenIDConnectStrategy(
  {
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    authorizationURL: `https://${process.env.AUTH0_DOMAIN}/authorize`,
    tokenURL: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    userInfoURL: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
    scope: ["profile"],
  },
  (verify = (issuer, profile, cb) => {
    return cb(null, profile);
  })
);

const jwtStrategy = new JwtStrategy(
    {
      jwtFromRequest: () =>
      req.session.jwt , 
      secretOrKey: process.env.JWT_SECRET,

    },
    (jwt_payload, done) => {
      return done(null, jwt_payload);
    }
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

passport.use(openIdConnectStrategy);
passport.use(jwtStrategy);

module.exports = passport;