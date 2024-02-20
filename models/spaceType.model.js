const { Schema, model } = require("mongoose");

const faultTypeSchema = new Schema({
  hebrew: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = model("space.types", faultTypeSchema);
