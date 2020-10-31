const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { ROLES } = require("../../config/constant");
const { signToken } = require("../../util/jwt");

module.exports.register = async (req, res, next) => {
  let data = req.body;

  const user_exists_with_email = await User.exists({
    email: data.email,
  });
  const user_exists_with_phone = await User.exists({
    phone: data.phone,
  });

  if (user_exists_with_email) {
    return res.status(409).json({ error: "Email exists" });
  }
  if (user_exists_with_phone) {
    return res.status(409).json({ error: "Phone exists" });
  }
  data.role = ROLES.USER;

  data.password = await bcrypt.hash(data.password, 10);

  try {
    const user = await User.create(data);

    const token = signToken(user);

    return res.status(200).json({
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.login = async (req, res, next) => {};
module.exports.authUserDetails = async (req, res, next) => {
  return res.status(200).json({ user: req.user });
};
