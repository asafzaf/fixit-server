const express = require("express");
const faultController = require("../controllers/fault.controller");
const router = express.Router();

router.route("/user/:id").get(faultController.getAllFaultsById);
<<<<<<< HEAD

router
  .route("/")
  .get(faultController.getAllFaults)
  .post(faultController.createFault)
  .put(faultController.updateFault)
  .delete(faultController.deleteFault);
=======
router.route("/:id").get(faultController.getFaultById);
router.route("/").get(faultController.getAllFaults).
post(faultController.uploadFaultPhoto, faultController.createFault);
>>>>>>> 26c523f1783fc5faeed77de67fa486debe5e48c0

module.exports = router;
