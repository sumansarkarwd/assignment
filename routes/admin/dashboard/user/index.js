const express = require("express");

const { index, edit } = require("../../../../controller/admin/userController");

const router = express.Router();

router.get("/", index);
router.get("/:user_id/edit", edit);

module.exports = router;
