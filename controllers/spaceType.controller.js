const spaceTypeRepository = require('../repositories/spaceType.repository');
const { BadRequestError, NotFoundError } = require('../errors/errors');
const catchAsync = require('../utils/catch.async');

exports.getAllSpaceTypes = catchAsync(async (req, res, next) => {
    const spaceTypes = await spaceTypeRepository.find();
    if (!spaceTypes) {
        return next(new BadRequestError('data'));
    }
    if (spaceTypes.length === 0) {
        return next(new NotFoundError('space types'));
    }
    res.status(200).json({
        status: 'success',
        results: spaceTypes.length,
        data: {
        spaceTypes,
        },
    });
    });