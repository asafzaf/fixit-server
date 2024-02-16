const outsideRepository = require("../repositories/outside.repository");
const { BadRequestError, NotFoundError } = require("../errors/errors");
const catchAsync = require("../utils/catch.async");

exports.getAllOutsides = catchAsync(async (req, res, next) => {
  const outsides = await outsideRepository.find();
  if (!outsides) {
    return next(new BadRequestError("data"));
  }
  if (outsides.length === 0) {
    return next(new NotFoundError("outsides"));
  }
  res.status(200).json({
    status: "success",
    results: outsides.length,
    data: {
      outsides,
    },
  });
});
