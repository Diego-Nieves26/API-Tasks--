const express = require("express");

// Controllers
const {
  createTask,
  getAllTasks,
  getTaskByStatus,
  updateTask,
  cancelTask,
} = require("../controllers/tasks.controller");

// Middlewares
const { createTaskValidator } = require("../middlewares/validators.middleware");
const { taskExists } = require("../middlewares/tasks.middleware");

const tasksRouter = express.Router();

//Routes
tasksRouter.post("/", createTaskValidator, createTask);
tasksRouter.get("/", getAllTasks);
tasksRouter.get("/:status", getTaskByStatus);
tasksRouter.patch("/:id", taskExists, updateTask);
tasksRouter.delete("/:id", cancelTask);

module.exports = { tasksRouter };
