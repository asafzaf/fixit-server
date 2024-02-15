const mongoose = require("mongoose");
const EventEmitter = require("events");
const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_NAME,
  NODE_ENV,
} = require("../constants");
const connectionUrl = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

module.exports = class MongoDB extends EventEmitter {
  constructor(entiyName) {
    super();
    this.Model = require(`../models/${entiyName}.model`);
    this.connectDB();
  }
  connectDB() {
    mongoose
      .connect(connectionUrl)
      .then(() => {
        NODE_ENV == "test" ? null : console.log("Connected to MongoDB");
      })
      .catch((error) => {
        NODE_ENV == "test"
          ? null
          : console.error("Error connecting to MongoDB:", error);
      });
  }

  find() {
    return this.Model.find({});
  }

  findOne(query) {
    return this.Model.findOne(query);
  }

  findById(id) {
    return this.Model.findById(id);
  }

  async create(data) {
    const item = await new this.Model(data);
    await item.save();
    return item;
  }

  put(id, data) {
    return this.Model.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id) {
    return this.Model.findByIdAndDelete(id);
  }
};
