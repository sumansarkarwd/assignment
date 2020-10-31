"use strict";
const mongoose = require("mongoose");
const moment = require("moment");

const CountrySchema = new mongoose.Schema(
  {
    name: String,
    code: String,
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

module.exports = mongoose.model("Country", CountrySchema);
