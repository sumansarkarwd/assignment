const express = require("express");
const passport = require("passport");

const {
  register,
  login,
  authUserDetails,
} = require("../../../controller/api/userController");
const { checkAuthenticatedJwt } = require("../../../middleware/auth");
const validator = require("../../../middleware/validator");
const userValidations = require("../../../validations/userValidations");

const router = express.Router();

router.post("/register", validator(userValidations.register, "body"), register);
router.post("/login", login);
router.post("/me", checkAuthenticatedJwt, authUserDetails);

module.exports = router;
