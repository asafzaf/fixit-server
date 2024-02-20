const faultDomainRepository = require("../repositories/faultDomain.repository");
const { BadRequestError, NotFoundError } = require("../errors/errors");
const catchAsync = require("../utils/catch.async");

exports.getAllFaultDomains = catchAsync(async (req, res, next) => {
  const faultDomains = await faultDomainRepository.find();
  if (!faultDomains) {
    return next(new BadRequestError("data"));
  }
  if (faultDomains.length === 0) {
    return next(new NotFoundError("fault domains"));
  }
  res.status(200).json({
    status: "success",
    results: faultDomains.length,
    data: {
      faultDomains,
    },
  });
});

exports.getDomainById = catchAsync(async (req, res, next) => {
  const faultDomain = await faultDomainRepository.retrieve(req.params.id);
  if (!faultDomain) {
    return next(new NotFoundError("fault domain"));
  }
  res.status(200).json({
    status: "success",
    data: {
      faultDomain,
    },
  });
});

