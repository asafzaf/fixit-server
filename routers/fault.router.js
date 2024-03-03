const express = require("express");
const faultController = require("../controllers/fault.controller");
const router = express.Router();

router.route("/user/:id").get(faultController.getAllFaultsById);
router.route("/:id").get(faultController.getFaultById);
router.route("/:id").put(faultController.updateFault);
router.route("/:id").delete(faultController.deleteFault);
router
  .route("/")
  .get(faultController.getAllFaults)
  .post(faultController.uploadFaultPhoto, faultController.createFault);

module.exports = router;
