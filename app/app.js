const express = require("express");
const spaceTypeRouter = require("../routers/spaceType.router");
const faultTypeRouter = require("../routers/faultType.router");
const userRouter = require("../routers/user.router");
const globalErrorHandler = require("../controllers/error.controller");
const logger = require("morgan");
const {
  BadRequestError,
  ServerError,
  NotFoundError,
} = require("../errors/errors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/space-types", spaceTypeRouter);
app.use("/api/v1/fault-types", faultTypeRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new NotFoundError(req.originalUrl));
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;