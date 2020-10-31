const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const moment = require("moment");
const dompurify = createDomPurifier(new JSDOM().window);

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
    formatted_address: String,
    state: String,
    country: String,
    phone: String,
    dob: Date,
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
