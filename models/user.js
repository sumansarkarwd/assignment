"use strict";
const mongoose = require("mongoose");
const moment = require("moment");
require("./country");
require("./state");
const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "user"],
    },
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    formatted_address: String,
    state_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
    country_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    phone: String,
    dob: String,
    is_active: {
      type: Boolean,
      default: true,
    },
    deleted_on: Date,
  },
  {
    timestamps: { currentTime: () => moment.utc() },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("User", UserSchema);
