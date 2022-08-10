const express = require("express");

// Controllers
const {
  createUser,
  getAllActiveUsers,
  updateUser,
  disableUser,
} = require("../controllers/users.controller");

// Middlewares
const { createUserValidator } = require("../middlewares/validators.middleware");
const { userExists } = require("../middlewares/users.middleware");

const usersRouter = express.Router();

// Endpoints
usersRouter.post("/", createUserValidator, createUser);

usersRouter.get("/", getAllActiveUsers);

usersRouter.patch("/:id", userExists, updateUser);

usersRouter.delete("/:id", userExists, disableUser);

module.exports = { usersRouter };
