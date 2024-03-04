const { Schema, model } = require("mongoose");

const maintenanceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "A maintenance must have a userId"],
  },
  userName: {
    type: String,
    required: [true, "A maintenance must have a userName"],
  },
  buildings: {
    type: [Object],
    required: [true, "A maintenance must have a buildings"],
  },
});

const Maintenance = model("maintenance.users", maintenanceSchema);

module.exports = Maintenance;
