const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// load env
dotenv.config();

// load models
const State = require("../models/state");

// connect to db
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// read JSON file
const events_data = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/state.json`, "utf-8")
);

// Import data
const importData = async () => {
  try {
    await State.create(events_data);
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
    await State.deleteMany();
    console.log("Data deleted...");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

console.log({ argv: process.argv });

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  cleanData();
}
