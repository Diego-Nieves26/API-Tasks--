// Models
const { User } = require("../models/user.model");
//const { Task } = require("../models/task.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(new AppError("Email already taken", 400));
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: "success",
    newUser,
  });
});

const getAllActiveUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ status: "active" });

  res.status(200).json({
    status: "success",
    users,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(204).json({ status: "success" });
});

const disableUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "disable" });

  res.status(204).json({ status: "success" });
});

module.exports = {
  getAllActiveUsers,
  createUser,
  updateUser,
  disableUser,
};
