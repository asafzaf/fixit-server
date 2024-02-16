const buildingRepository = require("../repositories/building.repository");
const { BadRequestError, NotFoundError } = require("../errors/errors");
const catchAsync = require("../utils/catch.async");

exports.getAllBuildings = catchAsync(async (req, res, next) => {
  const buildings = await buildingRepository.find();
  if (!buildings) {
    return next(new BadRequestError("data"));
  }
  if (buildings.length === 0) {
    return next(new NotFoundError("buildings"));
  }
  res.status(200).json({
    status: "success",
    results: buildings.length,
    data: {
      buildings,
    },
  });
});
exports.getBuilding = catchAsync(async (req, res, next) => {
  if (!idIsValid(req.params.id)) {
    return next(new BadRequestError("id"));
  }
  const building = await buildingRepository.retrieve(req.params.id);
  if (!building) {
    return next(new NotFoundError("building"));
  }
  res.status(200).json({
    status: "success",
    data: {
      building,
    },
  });
});

