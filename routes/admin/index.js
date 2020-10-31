const express = require("express");

const { login } = require("../../controller/admin/adminController");

const router = express.Router();
const dashboardRoutes = require("./dashboard");

router.get("/login", [], login);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
