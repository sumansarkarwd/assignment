const User = require("../../models/user");

module.exports.login = async (req, res, next) => {
  res.render("admin/login", {});
};

module.exports.dashboard = async (req, res, next) => {
  res.render("admin/dashboard", {});
};
