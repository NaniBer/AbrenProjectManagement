const mongoose = require("mongoose");

const MilestonesSchema = mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
    required: true,
  },
  MilestoneName: {
    type: String,
    required: true,
  },
  MilestoneDescription: {
    type: String,
    required: true,
  },
  ResourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
    required: true,
  },
  ResourceQuantity: {
    type: Number,
    required: true,
  },
  AllocatedBudget: {
    type: Number,
    required: true,
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
});
const Milestones = mongoose.model("Milestones", MilestonesSchema);
module.exports = Milestones;
