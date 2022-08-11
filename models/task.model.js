const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.ObjectId,
  },
  title: {
    type: String,
    required: [true, "Please provide a valid title"],
  },
  dates: {
    limitDate: {
      type: Date,
      required: [true, "Please provide a valid limitDate"],
    },
    startDate: Date,
    finishDate: Date,
  },
  status: {
    type: String,
    default: "active",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
