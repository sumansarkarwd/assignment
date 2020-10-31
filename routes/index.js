const express = require("express");
const app = express();
const passport = require("passport");

const adminRoutes = require("./admin");
const apiRoutes = require("./api");

app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);

module.exports = app;
