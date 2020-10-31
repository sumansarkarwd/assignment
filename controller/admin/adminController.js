const User = require("../../models/user");

module.exports.login = async (req, res, next) => {
  res.render("admin/login", {});
};

module.exports.loginSubmit = async (req, res, next) => {
  res.render("admin/login", {});
};

module.exports.dashboard = async (req, res, next) => {
  res.render("admin/dashboard", {
    user: {
      name: `${req.user.first_name} ${req.user.last_name}`,
    },
  });
};
