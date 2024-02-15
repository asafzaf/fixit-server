const fs = require("fs");
const {
  NotFoundError,
  BadRequestError,
  ServerError,
} = require("../errors/errors");
const { EventEmitter } = require("stream");

const instance = fs.readFileSync("./data/faultCollection.json", "utf-8");

module.exports = class FaultTypeController extends EventEmitter {
  constructor() {
    super();
  }

  getAllFaultTypes = (req, res) => {
    try {
      const resultData = JSON.parse(instance);
      res.status(200).json({
        message: "domain retrieved successfully",
        status: "success",
        data: {
          resultData,
        },
      });
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
  };
  getDomainById = (req, res) => {
    try {
      if (!req.params.id) {
        throw new BadRequestError("id");
      }
      const id = req.params.id;
      const data = JSON.parse(instance);
      const result = data.domains.filter((item) => item.id === id);
      if (result.length === 0) throw new NotFoundError("fault type");
      res.status(200).json({
        message: "domain retrieved successfully",
        status: "success",
        data: {
          result,
        },
      });
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
  };
};
