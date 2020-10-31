const User = require("../../models/user");

module.exports.index = async (req, res, next) => {
  const Users = await User.find({
    role: "user",
  });
  res.render("admin/user/index", { Users });
};

module.exports.edit = async (req, res, next) => {
  const Users = await User.find({
    role: "user",
  });
  res.render("admin/user/edit", { Users });
};
