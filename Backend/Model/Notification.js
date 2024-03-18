const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  type: {
    type: String,
    enum: [
      "projectAssigned",
      "taskAssigned",
      "approachingDeadline",
      "lowResources",
      "progressUpdated",
    ],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);
const createNotification = async (userId, projectId, type, message) => {
  try {
    const notification = new Notification({
      userId,
      projectId,
      type,
      message,
    });
    await notification.save();
    console.log("Notification created successfully");
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

module.exports = {
  Notification,
  createNotification,
};
