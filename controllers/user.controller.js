const userRepository = require("../repositories/user.repository");
const { BadRequestError, NotFoundError } = require("../errors/errors");
const catchAsync = require("../utils/catch.async");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userRepository.find();
  if (!users) {
    return next(new BadRequestError("data"));
  }
  if (users.length === 0) {
    return next(new NotFoundError("users"));
  }
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  if (!idIsValid(req.params.id)) {
    return next(new BadRequestError("id"));
  }
  const user = await userRepository.retrieve(req.params.id);
  if (!user) {
    return next(new NotFoundError("user"));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (!idIsValid(req.params.id)) {
    return next(new BadRequestError("id"));
  }
  const result = await userRepository.put(req.params.id, req.body);
  if (!result) {
    return next(new NotFoundError("user"));
  }
  res.status(200).json({
    status: "success",
    data: {
      user: result,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (!idIsValid(req.params.id)) {
    return next(new BadRequestError("id"));
  }
  const result = await userRepository.delete(req.params.id);
  if (!result) {
    return next(new NotFoundError("user"));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const idIsValid = (id) => {
  if (
    !id ||
    // !id.match(/^[0-9a-fA-F]{24}$/) ||
    id.length !== 24 ||
    id === "undefined" ||
    id === "null" ||
    id === "false" ||
    id === "true" ||
    id === "0" ||
    id === "1"
  ) {
    return false;
  }
  return true;
};
