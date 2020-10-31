const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// load env
dotenv.config();

// load models
const Country = require("../models/country");

// connect to db
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// read JSON file
const events_data = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/country.json`, "utf-8")
);

// Import data
const importData = async () => {
  try {
    await Country.create(events_data);
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
    await Country.deleteMany();
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
