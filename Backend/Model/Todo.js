const mongoose = require("mongoose");
TodoSchema = mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  TodoName: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: false,
  },

  Priority: {
    type: String,
    required: true,
    enum: ["High", "Medium", "Low"],
  },
  Status: {
    type: String,
    required: true,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  Viewed: {
    type: Boolean,
    // required: true
  },
});
const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
