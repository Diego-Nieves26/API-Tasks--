// Models
const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const createTask = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const newTask = await Task.create({
    userId,
    title,
    dates: {
      limitDate,
      startDate: new Date().toISOString(),
      finishDate: null,
    },
  });

  res.status(201).json({
    status: "success",
    newTask,
  });
});

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find();

  res.status(200).json({
    status: "success",
    tasks,
  });
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;
  const tasks = await Task.find({ status });

  if (
    status !== "active" &&
    status !== "completed" &&
    status !== "late" &&
    status !== "cancelled"
  ) {
    return res.status(404).json({
      status: "error",
      message: "Invalid status",
    });
  }

  res.status(200).json({
    status: "success",
    tasks,
  });
});

const updateTask = catchAsync(async (req, res, next) => {
  const { task } = req;
  const { time } = req.body;

  if (Date.parse(time) <= Date.parse(task.limitDate)) {
    await task.update({ finishDate: time, status: "completed" });
  } else {
    await task.update({ finishDate: time, status: "late" });
  }

  res.status(204).json({ status: "success" });
});

const cancelTask = catchAsync(async (req, res, next) => {
  const { task } = req;

  await task.update({ status: "cancelled" });

  res.status(204).json({ status: "success" });
});

module.exports = {
  getAllTasks,
  createTask,
  getTaskByStatus,
  updateTask,
  cancelTask,
};
