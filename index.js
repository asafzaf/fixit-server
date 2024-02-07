const express = require("express");
const spaceTypeRouter = require("./routers/spaceType.router");
const faultTypeRouter = require("./routers/faultType.router");
const logger = require("morgan");
const {
  BadRequestError,
  ServerError,
  NotFoundError,
} = require("./errors/errors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/space-types", spaceTypeRouter);
app.use("/fault-types", faultTypeRouter);
 
app.all("*", (req, res, next) => {
  next(new NotFoundError("resource"));
});

app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send(err.message);
  } else if (err instanceof BadRequestError) {
    res.status(400).send(err.message);
  } else if (err instanceof ServerError) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
