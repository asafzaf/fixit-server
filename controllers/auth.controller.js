const catchAsync = require("../utils/catch.async");
const userRepository = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");

const { promisify } = require("util");

const { JWT_SECRET, JWT_EXPIRES_IN } = require("../constants");

const { BadRequestError } = require("../errors/errors");
const { UnauthorizedError } = require("../errors/userErrors");

const signToken = (id) => {
  return jwt.sign({ id: id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, message, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    message: message,
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await userRepository.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    isMaintenace: req.body.isMaintenace ? req.body.isMaintenace : false,
  });
  if (!newUser) {
    return next(new BadRequestError("data"));
  }
  createSendToken(newUser, 201, "User created successfully", res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("email or password"));
  }
  const user = await userRepository.retrieve({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new UnauthorizedError("Incorrect email or password!"));
  }
  createSendToken(user, 200, "User logged in successfull", res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new UnauthorizedError("You are not logged in!"));
  }
  const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

  const currentUser = await userRepository.retrieve(decoded.id);
  if (!currentUser) {
    return next(
      new UnauthorizedError(
        "The user belonging to this token does no longer exist."
      )
    );
  } else if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new UnauthorizedError(
        "User recently changed password! Please log in again."
      )
    );
  }
  req.user = currentUser;
  next();
});
