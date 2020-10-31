const passport = require("passport");

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/admin/login");
  }
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/admin/dashboard");
  } else {
    next();
  }
}

function checkAuthenticatedJwt(req, res, next) {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    console.log({ error, user, info });
    if (error) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        next();
      }
    }
  })(req, res);
}

module.exports.checkAuthenticated = checkAuthenticated;
module.exports.checkNotAuthenticated = checkNotAuthenticated;
module.exports.checkAuthenticatedJwt = checkAuthenticatedJwt;
