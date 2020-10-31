const mongoose = require("mongoose");
const moment = require("moment");

const StateSchema = new mongoose.Schema(
  {
    name: String,
    abbreviation: String,
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

module.exports = mongoose.model("State", StateSchema);
