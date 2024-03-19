const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const Admin = require("../Model/admin");
const Projects = require("../Model/Projects");
const Users = require("../Model/Users");

const { Notification } = require("../Model/Notification"); // Import the Notification model

router.post("/Login", async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;
    // Check if the user exists
    const users = await Users.findOne({ username });
    if (!users) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, users.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.userId = users._id;
    res.status(200).json({ message: "Login successful", user: users });
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
