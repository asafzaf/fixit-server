const faultRepository = require("../repositories/fault.repository");
const { BadRequestError, NotFoundError } = require("../errors/errors");
const catchAsync = require("../utils/catch.async");

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
    !body.typeId ||
    !body.typeNameEng ||
    !body.typeNameHeb ||
    !body.buildingId ||
    !body.buildingName ||
    !body.spaceNumber ||
    !body.spaceName ||
    !body.description ||
    !body.priority ||
    !body.reportByUser
  ) {
    throw next(new BadRequestError("data"));
  } else if (body.priority < 1 || body.priority > 5) {
    throw next(new BadRequestError("priority"));
  }
};
