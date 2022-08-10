const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please enter a userId"],
  },
  title: {
    type: String,
    required: [true, "Please provide a valid title"],
  },
  dates: {
    limitDate: {
      type: String,
      required: [true, "Please provide a valid limitDate"],
    },
    startDate: String,
    finishDate: String,
  },
  status: {
    type: String,
    default: "active",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
