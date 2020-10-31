const User = require("../../models/user");
const State = require("../../models/state");
const Country = require("../../models/country");
const { ROLES } = require("../../config/constant");
const moment = require("moment");

module.exports.index = async (req, res, next) => {
  const { search, active } = req.query;

  let query = {
    $and: [
      { role: ROLES.USER },
      { deleted_on: null },
      {
        $or: [
          { first_name: { $regex: new RegExp(search, "i") } },
          { last_name: { $regex: new RegExp(search, "i") } },
          { email: { $regex: new RegExp(search, "i") } },
          { formatted_address: { $regex: new RegExp(search, "i") } },
          { phone: { $regex: new RegExp(search, "i") } },
        ],
      },
    ],
  };

  if (active === "true") {
    query["$and"].push({
      is_active: true,
    });
  } else if (active === "false") {
    query["$and"].push({
      is_active: false,
    });
  }

  // console.log({ query: JSON.stringify(query) });

  const Users = await User.find(query)
    .sort({ createdAt: -1 })
    .populate("country_id")
    .populate("state_id");
  res.render("admin/user/index", { Users, search, active });
};

module.exports.edit = async (req, res, next) => {
  const { user_id } = req.params;
  const States = await State.find({}).sort({ name: 1 });
  const Countries = await Country.find({}).sort({ name: 1 });
  const user = await User.findById(user_id);
  if (!user) {
    req.flash("error", "User not found");
    res.redirect("/404");
  }
  res.render("admin/user/edit", { user, States, Countries });
};

module.exports.update = async (req, res, next) => {
  const { user_id } = req.params;
  let data = req.body;
  const user = await User.findById(user_id);
  // console.log({ data, user });
  if (!user) {
    req.flash("error", "User not found");
    res.redirect("/404");
  }

  if (data.is_active && data.is_active == "on") {
    data.is_active = true;
  } else {
    data.is_active = false;
  }

  try {
    await User.findByIdAndUpdate(user_id, data);
    res.redirect("/admin/dashboard/user");
  } catch (error) {}
};

module.exports.deleteUser = async (req, res, next) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id);

  if (!user) {
    req.flash("error", "User not found");
    res.redirect("/404");
  }

  let data = {
    deleted_on: moment().utc().toISOString(),
  };

  try {
    await User.findByIdAndUpdate(user_id, data);
    res.redirect("/admin/dashboard/user");
  } catch (error) {}
};
