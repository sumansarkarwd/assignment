const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { ROLES } = require("../config/constant");

function initializePassport(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email, role: ROLES.ADMIN }).lean();

    if (!user) {
      return done(null, false, { message: "No user found!" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect email or password" });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) =>
    done(null, await User.findOne({ _id: id, role: ROLES.ADMIN }).lean())
  );
}

module.exports = initializePassport;
