// Models
const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const createTask = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate } = req.body;
  const newTask = await Task.create({
    title,
    userId,
    limitDate,
    startDate: new Date().toISOString(),
  });

  res.status(201).json({
    status: "success",
    newTask,
  });
});

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.findAll({ include: User });

  res.status(200).json({
    status: "success",
    tasks,
  });
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;
  const tasks = await Task.findAll({ where: { status } });

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
  if (!tasks) {
    return res.status(404).json({
      status: "error",
      message: "Post not found",
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
  const { id } = req.params;
  const task = await Task.findOne({ where: { id } });

  if (!task) {
    return res.status(404).json({
      status: "error",
      message: "Taks not found",
    });
  }
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
