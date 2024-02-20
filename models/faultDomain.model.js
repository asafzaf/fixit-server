const { Schema, model } = require("mongoose");

const faultDomainSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  name_hebrew: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  colors: {
    type: [String],
  },
  types: {
    type: [Object],
  },
});

module.exports = model("fault.domains", faultDomainSchema);
