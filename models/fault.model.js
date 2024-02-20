const { Schema, model } = require("mongoose");

const faultSchema = new Schema({
  domainId: {
    type: String,
    required: [true, "A fault must have a domainId"],
  },
  domainNameEng: {
    type: String,
    required: [true, "A fault must have a domainNameEng"],
  },
  domainNameHeb: {
    type: String,
    required: [true, "A fault must have a domainNameHeb"],
  },
  typeId: {
    type: String,
    required: [true, "A fault must have a typeId"],
  },
  typeNameEng: {
    type: String,
    required: [true, "A fault must have a typeNameEng"],
  },
  typeNameHeb: {
    type: String,
    required: [true, "A fault must have a typeNameHeb"],
  },
  buildingId: {
    type: Schema.Types.ObjectId,
    ref: "building",
  },
  buildingName: {
    type: String,
  },
  outSide: {
    type: Boolean,
    default: false,
  },
  outSideId: {
    type: Schema.Types.ObjectId,
    ref: "outSide",
    default: null,
  },
  outSideName: {
    type: String,
    default: null,
  },
  floor: {
    type: Number,
    default: 0,
  },
  spaceNumber: {
    type: String,
    required: [true, "A fault must have a spaceNumber"],
  },
  spaceName: {
    type: String,
    required: [true, "A fault must have a spaceName"],
  },
  description: {
    type: String,
    required: [true, "A fault must have a description"],
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  priority: {
    type: Number,
    required: [true, "A fault must have a priority"],
  },
  reportByUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "A fault must have a reporter"],
  },
  assignedToUser: {
    type: [Schema.Types.ObjectId],
    ref: "users",
  },
  maintananceUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: {
    type: Date,
    default: null,
  },
});

module.exports = model("fault", faultSchema);