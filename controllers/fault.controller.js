const multer = require("multer");
const fs = require("fs");
const { uploadCloud } = require("../utils/cloudinary");

const faultRepository = require("../repositories/fault.repository");
const {
  BadRequestError,
  NotFoundError,
  ServerError,
} = require("../errors/errors");
const catchAsync = require("../utils/catch.async");
const mongoose = require("mongoose");

//uploading photos
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/faults");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.body.reportByUser}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new BadRequestError("image file"), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadFaultPhoto = upload.single("photo");

//get photos
exports.getFaultPhoto = (req, res, next) => {
  const imageName = req.params.imageName;
  console.log(imageName);
  const path = `public/img/faults/${imageName}`;
  if (!fs.existsSync(path)) {
    return next(new NotFoundError("photo"));
  }

  const readStream = fs.createReadStream(path);
  readStream.pipe(res);

  readStream.on("error", (err) => {
    return next(new ServerError("photo"));
  });

  res.on("error", (err) => {
    return next(new ServerError("photo"));
  });

  readStream.on("end", () => {
    res.end();
  });

  res.on("finish", () => {
    readStream.close();
  });
};

// CRUD functions

// get all faults
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

// get all faults by user id
exports.getAllFaultsById = catchAsync(async (req, res, next) => {
  // by reportByUser field (id)
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new BadRequestError("id"));
  }
  const faults = await faultRepository.find();
  const fa = faults.filter((fault) => fault.reportByUser.toString() === id);
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

// get fault by id
exports.getFaultById = catchAsync(async (req, res, next) => {
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

// create fault
exports.createFault = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  if (req.file) {
    // req.body.photo = req.file.filename;
    req.body.photo = await uploadCloud(req.file.filename);
  }
  // console.log(req.body);
  await bodyValidation(req.body, next);
  // console.log("pass validation");
  const fault = await faultRepository.create(req.body);
  // console.log("fault created");
  // console.log(fault.photo);
  return res.status(201).json({
    status: "success",
    data: {
      fault,
    },
  });
});

//  update fault by id
exports.updateFault = catchAsync(async (req, res, next) => {
  const fault = await faultRepository.retrieve(req.params.id);
  if (!fault) {
    return next(
      new NotFoundError("not found donation with id: " + req.params.id)
    );
  }
  await updateBodyValidation(req.body, next);
  const updatedFault = await faultRepository.put(req.params.id, req.body);
  return res.status(200).json({
    status: "success",
    data: {
      fault: updatedFault,
    },
  });
});

// delete fault by id
exports.deleteFault = catchAsync(async (req, res, next) => {
  const fault = await faultRepository.delete(req.params.id);
  if (!fault) {
    return next(new NotFoundError("fault"));
  }
  await faultRepository.delete(req.params.id);
  return res.status(204).json({
    status: "success",
    data: null,
  });
});

// get fault by by building id
exports.getAllFaultsByBuildingId = catchAsync(async (req, res, next) => {
  // building id
  const id = req.params.id;
  const faults = await faultRepository.find();
  const fa = faults.filter((fault) => {
    if (fault.buildingId) {
      return fault.buildingId.toString() === id;
    } else if (fault.outSideId) {
      return fault.outSideId.toString() === id;
    }
  });
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

const updateBodyValidation = (body, next) => {
  if (
    !body.domainId &&
    !body.domainNameEng &&
    !body.domainNameHeb &&
    !body.spaceTypeId &&
    !body.spaceTypeNameEng &&
    !body.spaceTypeNameHeb &&
    !body.buildingId &&
    !body.buildingName &&
    !body.spaceNumber &&
    !body.spaceName &&
    !body.description &&
    !body.status &&
    !body.urgency &&
    !body.reportByUser
  ) {
    throw next(new BadRequestError("details to update"));
  }
};

const bodyValidation = (body, next) => {
  if (Object.keys(body).length === 0) {
    throw next(new BadRequestError("data"));
  } else if (
    !body.domainId ||
    !body.domainNameEng ||
    !body.domainNameHeb ||
    // !body.spaceTypeId ||
    !body.spaceTypeNameEng ||
    // !body.spaceTypeNameHeb ||
    // !body.buildingId ||
    // !body.buildingName ||
    // !body.spaceNumber ||
    !body.spaceName ||
    // !body.description ||
    !body.urgency ||
    !body.reportByUser
  ) {
    throw next(new BadRequestError("data"));
  } else if (body.priority < 1 || body.priority > 5) {
    throw next(new BadRequestError("urgency level"));
  }
};