const express = require("express");
const faultController = require("../controllers/fault.controller");
const router = express.Router();

router.route("/").get(faultController.getAllFaults).
post(faultController.createFault);

router.route("/user/:id").get(faultController.getAllFaultsById);

module.exports = router;