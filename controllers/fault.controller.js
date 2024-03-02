const faultRepository = require("../repositories/fault.repository");
const { BadRequestError, NotFoundError } = require("../errors/errors");
const catchAsync = require("../utils/catch.async");
const mongoose = require('mongoose');

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

exports.getAllFaultsById = catchAsync(async (req, res, next) => {  // by reportByUser field (id)
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new BadRequestError("id"));
  }
  const faults = await faultRepository.find();
  const fa = faults.filter(fault => fault.reportByUser.toString() === id);
  if (!fa) {
    return next(new BadRequestError("data"));
  }
  if (fa.length === 0) {
    return next(new NotFoundError("faults"));
  }
  return res.status(200).json({
    status: "success",
    results: fa.length,
    data: {
      fa,
    },
  });
});

exports.getFaultById = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const fault = await faultRepository.retrieve(req.params.id);
  if (!fault) {
    return next(new NotFoundError("fault"));
  }
  return res.status(200).json({
    status: "success",
    data: {
      fault,
    },
  });
});

// get fault by by building id

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


// update fault by id + params

// delete fault by id

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
