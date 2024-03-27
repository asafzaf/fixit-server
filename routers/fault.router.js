const express = require("express");
const faultController = require("../controllers/fault.controller");
const router = express.Router();

router.route("/user/:id").get(faultController.getAllFaultsById);
router.route("/building/:id").get(faultController.getAllFaultsByBuildingId);
router
  .route("/:id")
  .get(faultController.getFaultById)
  .put(faultController.updateFault)
  .delete(faultController.deleteFault);
router
  .route("/")
  .get(faultController.getAllFaults)
  .post(faultController.uploadFaultPhoto, faultController.createFault);

module.exports = router;
