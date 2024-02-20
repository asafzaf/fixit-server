const express = require("express");
const buildingController = require("../controllers/building.controller");
const router = express.Router();

router.route("/").get(buildingController.getAllBuildings);
router.route("/:id").get(buildingController.getBuilding);

module.exports = router;