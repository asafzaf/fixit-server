const { Router } = require("express");
const fs = require("fs");
const faultTypeRouter = new Router();
const {
  NotFoundError,
  BadRequestError,
  ServerError,
} = require("../errors/errors");

const instance = fs.readFileSync("./data/faultCollection.json", "utf8");

faultTypeRouter
  .get("/all", (req, res) => {
    res.json(JSON.parse(instance));
  })
  .get("/domain/:id", (req, res) => {
    try {
      if (!req.params.id) {
        throw new BadRequestError("id");
      }
      const id = req.params.id;
      const data = JSON.parse(instance);
      const result = data.domains.filter((item) => item.id === id);
      if (result.length === 0) throw new NotFoundError("fault type");
      res.json(result);
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof BadRequestError ||
        error instanceof ServerError
      ) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).send("Internal Server Error");
      }
    }
  })
  .all((req, res, next) => {
    res.status(404).send("Resource not found");
  });

module.exports = faultTypeRouter;
