const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const BudgetPlanSchema = mongoose.Schema({
  Project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
    required: true,
  },
  AllocatedBudget: {
    type: Number,
    required: true,
  },
  AllocatedFor: {
    type: String,
    required: true,
  },
});
const BudgetPlan = mongoose.model("BudgetPlan", BudgetPlanSchema);
module.exports = BudgetPlan;
