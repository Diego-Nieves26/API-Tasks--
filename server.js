const { app } = require("./app");

// Models
const { User } = require("./models/user.model");
const { Task } = require("./models/task.model");

// Utils
const { db } = require("./utils/database.util");

db.authenticate()
  .then(() => console.log("Db authenticated"))
  .catch((err) => console.log(err));

// Establish models relations
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User);

db.sync()
  .then(() => console.log("Db synced"))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("Express app running!!");
});
