const User = require("../../models/user");
const { ROLES } = require("../../config/constant");

module.exports.index = async (req, res, next) => {
  const Users = await User.find({
    role: ROLES.USER,
    deleted_on: null,
  })
    .sort({ createdAt: -1 })
    .populate("country_id")
    .populate("state_id");
  res.render("admin/user/index", { Users });
};

module.exports.edit = async (req, res, next) => {
  const Users = await User.find({
    role: "user",
  });
  res.render("admin/user/edit", { Users });
};
