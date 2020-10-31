const Joi = require("joi").extend(require("@hapi/joi-date"));

module.exports = Object.freeze({
  register: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    formatted_address: Joi.string().required(),
    state_id: Joi.string().required(),
    country_id: Joi.string().required(),
    phone: Joi.string().min(10).max(10).required(),
    dob: Joi.date().format("YYYY-MM-DD").min("now"),
  }),
});
