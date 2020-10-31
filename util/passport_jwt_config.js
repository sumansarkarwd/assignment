const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("../models/user");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: process.env.PASSPORT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub).lean();

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
