const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const Admin = require("../Model/admin");
const Projects = require("../Model/Projects");
const Users = require("../Model/Users");

const { Notification } = require("../Model/Notification"); // Import the Notification model

router.post("/Login", async (req, res) => {
  try {
    const { username, password, type } = req.body;

    if (type === "admin") {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.adminId = admin._id;

      // Fetch notifications for admin (if applicable)
      const notifications = []; // Modify this to fetch notifications from the database
      res.status(200).json({ user: admin, notifications });
    } else {
      const user = await Users.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user._id;

      // Fetch notifications for user
      if (type === "user") {
        // Fetch notifications for user
        const userNotifications = await Notification.find({
          userId: user._id,
        });
        console.log(userNotifications);
        res.status(200).json({ user, notifications: userNotifications });
      }
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

//Logout
router.post("/logout", async (req, res) => {
  try {
    console.log("Logout ");
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error logging out:", err);
        return res.status(500).json({ message: "Error logging out" });
      }

      // Clear the session cookie
      res.clearCookie("sessionID");

      // Respond with success message
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Error logging out" });
  }
});
module.exports = router;
