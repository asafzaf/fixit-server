const { Router } = require("express");
const faultTypeController = require("../controllers/faultType.controller");

const faultTypeRouter = new Router();
const faultTypeControllerInstance = new faultTypeController();

faultTypeRouter
  .get("/all", faultTypeControllerInstance.getAllFaultTypes)
  .get("/domain/:id", faultTypeControllerInstance.getDomainById)
  .all((req, res, next) => {
    res.status(404).send("Resource not found");
  });

module.exports = faultTypeRouter;
