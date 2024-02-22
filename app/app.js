const express = require("express");
const spaceTypeRouter = require("../routers/spaceType.router");
const faultDomainRouter = require("../routers/faultDomain.router");
const faultRouter = require("../routers/fault.router");
const userRouter = require("../routers/user.router");
const buildingRouter = require("../routers/building.router");
const outsideRouter = require("../routers/outside.router");
const globalErrorHandler = require("../controllers/error.controller");
const logger = require("morgan");
const {
  BadRequestError,
  ServerError,
  NotFoundError,
} = require("../errors/errors");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/space-type", spaceTypeRouter);
app.use("/api/v1/fault-domain", faultDomainRouter);
app.use("/api/v1/fault", faultRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/building", buildingRouter);
app.use("/api/v1/outside", outsideRouter);

app.all("*", (req, res, next) => {
  next(new NotFoundError(req.originalUrl));
});

app.use(globalErrorHandler);

const serv = app.listen(port, () => {
  process.env.NODE_ENV === "test"
    ? null
    : console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection! Shutting down...");
  serv.close(() => {
    process.exit(1);
  });
});


process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception! Shutting down...");
  serv.close(() => {
    process.exit(1);
  });
});

module.exports = app;
