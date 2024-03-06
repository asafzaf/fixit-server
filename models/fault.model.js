const { Schema, model } = require("mongoose");

const faultSchema = new Schema({
  domainId: {
    type: Schema.Types.ObjectId,
    ref: "fault.domains",
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
  faultTypeId: {
    type: String,
    required: [true, "A fault must have a faultTypeId"],
  },
  faultTypeNameEng: {
    type: String,
    required: [true, "A fault must have a faultTypeNameEng"],
  },
  faultTypeNameHeb: {
    type: String,
    required: [true, "A fault must have a faultTypeNameHeb"],
  },
  buildingId: {
    type: Schema.Types.ObjectId,
    ref: "building",
    default: null,
  },
  buildingName: {
    type: String,
    default: null,
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
  spaceTypeId: {
    type: Schema.Types.ObjectId,
    ref: "space.types",
    default: null,
    // required: [true, "A fault must have a spaceTypeId"],
  },
  spaceTypeNameEng: {
    type: String,
    required: [true, "A fault must have a spaceTypeNameEng"],
  },
  spaceTypeNameHeb: {
    type: String,
    // required: [true, "A fault must have a spaceTypeNameHeb"],
  },
  spaceNumber: {
    type: String,
    // required: [true, "A fault must have a spaceNumber"],
    default: null,
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
    enum: ["pending", "in-progress", "closed"],
    default: "pending",
  },
  photo: {
    type: String,
    default: null,
  },
  urgency: {
    type: Number,
    required: [true, "A fault must have a urgency"],
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
    default: null,
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
