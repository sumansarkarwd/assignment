const express = require("express");
const app = express();
const passport = require("passport");

const adminRoutes = require("./admin");
const apiRoutes = require("./api");

// initialize passport for admin user
const initializePassport = require("../util/passport_config");
initializePassport(passport);
// passport for normal user
require("../util/passport_jwt_config");

app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);

module.exports = app;
