const faultRepository = require("../repositories/fault.repository");
const { BadRequestError, NotFoundError } = require("../errors/errors");
const catchAsync = require("../utils/catch.async");
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllFaults = catchAsync(async (req, res, next) => {
  const faults = await faultRepository.find();
  if (!faults) {
    return next(new BadRequestError("data"));
  }
  if (faults.length === 0) {
    return next(new NotFoundError("faults"));
  }
  return res.status(200).json({
    status: "success",
    results: faults.length,
    data: {
      faults,
    },
  });
});

exports.getAllFaultsById = catchAsync(async (req, res, next) => {
  const id = new ObjectId.createFromHexString(req.params.id);
  const exludedFields = ["password", "passwordConfirm", "isMaintenace", "role", "active", "createdAt", "updatedAt"];
  exludedFields.forEach((el) => delete id[el]);
  const faults = await faultRepository.findByUserId({
    reportByUser: id,
  });
  if (!faults) {
    return next(new BadRequestError("data"));
  }
  if (faults.length === 0) {
    return next(new NotFoundError("faults"));
  }
  return res.status(200).json({
    status: "success",
    results: faults.length,
    data: {
      faults,
    },
  });
});

exports.createFault = catchAsync(async (req, res, next) => {
  await bodyValidation(req.body, next);
  const fault = await faultRepository.create(req.body);
  return res.status(201).json({
    status: "success",
    data: {
      fault,
    },
  });
});

const bodyValidation = (body, next) => {
  if (Object.keys(body).length === 0) {
    throw next(new BadRequestError("data"));
  } else if (
    !body.domainId ||
    !body.domainNameEng ||
    !body.domainNameHeb ||
    !body.spaceTypeId ||
    !body.spaceTypeNameEng ||
    !body.spaceTypeNameHeb ||
    !body.buildingId ||
    !body.buildingName ||
    !body.spaceNumber ||
    !body.spaceName ||
    !body.description ||
    !body.urgency ||
    !body.reportByUser
  ) {
    throw next(new BadRequestError("data"));
  } else if (body.priority < 1 || body.priority > 5) {
    throw next(new BadRequestError("priority"));
  }
};
