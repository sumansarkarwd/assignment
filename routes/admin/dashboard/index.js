const express = require("express");

const { dashboard } = require("../../../controller/admin/adminController");
const { checkAuthenticated } = require("../../../middleware/auth");

const router = express.Router();

const userRoutes = require("./user");

router.get("/", [], dashboard);
router.use("/user", checkAuthenticated, userRoutes);

module.exports = router;
