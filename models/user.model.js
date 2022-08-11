const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a valid name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    status: {
      type: String,
      default: "active",
    },
  },
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

userSchema.virtual('tasks', {
	ref: 'Task',
	foreignField: 'userId',
	localField: '_id',
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
