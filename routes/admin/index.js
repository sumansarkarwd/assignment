const express = require("express");
const passport = require("passport");

const {
  login,
  loginSubmit,
} = require("../../controller/admin/adminController");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../../middleware/auth");

const router = express.Router();
const dashboardRoutes = require("./dashboard");

router.get("/login", checkNotAuthenticated, login);
router.post(
  "/loginSubmit",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/login",
    failureFlash: true,
  })
);
router.use("/dashboard", checkAuthenticated, dashboardRoutes);
router.delete("/logout", checkAuthenticated, (req, res) => {
  req.logOut();
  res.redirect("/admin/login");
});

module.exports = router;
