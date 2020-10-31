const express = require("express");
const app = express();

const adminRoutes = require("./admin");
const userRoutes = require("./admin/dashboard/user");

app.use("/admin", adminRoutes);
// app.use("/user", userRoutes);

module.exports = app;
