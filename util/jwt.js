const moment = require("moment");
const JWT = require("jsonwebtoken");

module.exports.signToken = (user) => {
  return JWT.sign(
    {
      iss: "test",
      sub: user.id,
      iat: moment().utc().toDate().getTime(),
      exp: moment().utc().add(1, "day").toDate().getTime(),
    },
    process.env.PASSPORT_SECRET
  );
};
