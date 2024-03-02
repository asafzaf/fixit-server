const express = require("express");

const spaceTypeRouter = require("../routers/spaceType.router");
const faultDomainRouter = require("../routers/faultDomain.router");
const faultRouter = require("../routers/fault.router");
const userRouter = require("../routers/user.router");
const buildingRouter = require("../routers/building.router");
const outsideRouter = require("../routers/outside.router");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.use("/api/v1/space-type", spaceTypeRouter);
router.use("/api/v1/fault-domain", faultDomainRouter);
router.use("/api/v1/fault", faultRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/building", buildingRouter);
router.use("/api/v1/outside", outsideRouter);

module.exports = router;
