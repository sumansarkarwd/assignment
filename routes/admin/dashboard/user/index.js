const express = require("express");

const {
  index,
  edit,
  update,
  deleteUser
} = require("../../../../controller/admin/userController");
const validatorHtml = require("../../../../middleware/validatorHtml")
const {update: updateUserValidationSchema} = require("../../../../validations/userValidations")

const router = express.Router();

router.get("/", index);
router.get("/:user_id/edit", edit);
router.post("/:user_id/update", validatorHtml(updateUserValidationSchema, 'body'), update);
router.delete("/:user_id/delete", deleteUser);

module.exports = router;
