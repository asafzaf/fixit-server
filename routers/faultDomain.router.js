const { Router } = require("express");
const faultDomainController = require("../controllers/faultDomain.controller");

const faultDomainRouter = new Router();

faultDomainRouter
  .get("/", faultDomainController.getAllFaultDomains)
  .get("/:id", faultDomainController.getDomainById)
  .all((req, res, next) => {
    res.status(404).send("Resource not found");
  });

module.exports = faultDomainRouter;
