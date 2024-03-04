const catchAsync = require("../utils/catch.async");
const maintenanceRepository = require("../repositories/maintenance.repository");

const { BadRequestError, NotFoundError } = require("../errors/errors");

exports.getAllMaintenances = catchAsync(async (req, res, next) => {
  const maintenances = await maintenanceRepository.find();
  if (!maintenances) {
    return next(new BadRequestError("data"));
  }
  if (maintenances.length === 0) {
    return next(new NotFoundError("maintenances"));
  }
  res.status(200).json({
    status: "success",
    results: maintenances.length,
    data: {
      maintenances,
    },
  });
});

exports.getMaintenance = catchAsync(async (req, res, next) => {
  if (!idIsValid(req.params.id)) {
    return next(new BadRequestError("id"));
  }
  const maintenances = await maintenanceRepository.find();
  if (!maintenances) {
    return next(new NotFoundError("maintenances"));
  }
  const maintenance = maintenances.filter(
    (maintenance) => maintenance.userId.toString() === req.params.id
  );
  if (!maintenance) {
    return next(new NotFoundError("maintenance"));
  }

  res.status(200).json({
    status: "success",
    data: {
      maintenance: maintenance[0],
    },
  });
});

exports.createMaintenance = catchAsync(async (req, res, next) => {
  const maintenance = await maintenanceRepository.create(req.body);
  if (!maintenance) {
    return next(new BadRequestError("maintenance"));
  }
  res.status(201).json({
    status: "success",
    data: {
      maintenance,
    },
  });
});

exports.updateMaintenance = catchAsync(async (req, res, next) => {
  const maintenance = await maintenanceRepository.retrieve(req.params.id);
  if (!maintenance) {
    return next(new NotFoundError("maintenance"));
  }
  const updatedMaintenance = await maintenanceRepository.put(
    req.params.id,
    req.body
  );
  res.status(200).json({
    status: "success",
    data: {
      maintenance: updatedMaintenance,
    },
  });
});

exports.deleteMaintenance = catchAsync(async (req, res, next) => {
  const maintenance = await maintenanceRepository.retrieve(req.params.id);
  if (!maintenance) {
    return next(new NotFoundError("maintenance"));
  }
  await maintenanceRepository.delete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

function idIsValid(id) {
  return id.match(/^[0-9a-fA-F]{24}$/);
}
