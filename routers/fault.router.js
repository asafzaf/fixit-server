const express = require("express");
const faultController = require("../controllers/fault.controller");
const router = express.Router();

router.route("/user/:id").get(faultController.getAllFaultsById);

router.route("/").get(faultController.getAllFaults).
post(faultController.createFault);

module.exports = router;