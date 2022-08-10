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

// Endpoints
tasksRouter.post("/", createTaskValidator, createTask);

tasksRouter.get("/", getAllTasks);

tasksRouter.get("/:status", getTaskByStatus);

tasksRouter.patch("/:id", taskExists, updateTask);

tasksRouter.delete("/:id", taskExists, cancelTask);

module.exports = { tasksRouter };
