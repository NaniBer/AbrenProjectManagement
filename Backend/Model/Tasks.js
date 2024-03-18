const mongoose = require("mongoose");
const { schema } = require("./admin");
const TasksSchema = mongoose.Schema({
  milestone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Milestones",
    //  required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
    // required: true,
  },
  TaskName: {
    type: String,
    required: true,
  },
  StartDate: {
    type: Date,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true,
  },
  TaskDescription: {
    type: String,
    // required: true
  },
  viewed: {
    type: Boolean,
    //required: true
  },
  assignedTo: [
    {
      _id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: Number,
  },
  subTasks: [
    {
      name: String,
      completed: Boolean, // Add the completed attribute
    },
  ],
});
const Tasks = mongoose.model("Tasks", TasksSchema);
module.exports = Tasks;
