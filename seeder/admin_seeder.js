const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// load env
dotenv.config();

// load models
const User = require("../models/user");
const State = require("../models/state");
const Country = require("../models/country");
const { ROLES } = require("../config/constant");

// connect to db
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Import data
const importData = async () => {
  try {
    const first_name = "Suman";
    const last_name = "Sarkar";
    const formatted_address = "30/3 Behari Lal Paul Street Kolkata - 700 036";
    const state = await State.findOne({
      name: "Alabama",
    });
    const country = await Country.findOne({
      name: "United States",
    });
    const email = "sumansarkarwd@gmail.com";
    const password = "123456";
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertData = {
      first_name,
      last_name,
      email,
      formatted_address,
      state_id: state ? state._id : null,
      country_id: country ? state._id : null,
      password: hashedPassword,
      role: ROLES.ADMIN,
    };

    try {
      await User.create(insertData);
    } catch (error) {
      console.log({ error: error.message });
    }
    console.log("Data imported...");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Clean data
const cleanData = async () => {
  try {
    await User.deleteOne({
      role: ROLES.ADMIN,
    });
    console.log("Data deleted...");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  cleanData();
}
