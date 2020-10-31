const express = require("express");

const { dashboard } = require("../../../controller/admin/adminController");

const router = express.Router();

const userRoutes = require("./user");

router.get("/", [], dashboard);
router.use("/user", userRoutes);

module.exports = router;
