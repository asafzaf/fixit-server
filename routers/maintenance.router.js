const express = require("express");
const maintenanceController = require("../controllers/maintenance.controller");

const router = express.Router();

router.route("/user/:id").get(maintenanceController.getMaintenance);

module.exports = router;
