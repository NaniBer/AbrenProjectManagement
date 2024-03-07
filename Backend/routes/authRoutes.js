const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../Model/admin");
const Projects = require("../Model/Projects");
const Users = require("../Model/Users");

router.post("/Login", async (req, res) => {
  try {
    const { username, password, type } = req.body;

    if (type == "admin") {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        console.log("error");
        return res.status(401).json({ message: "Invalid credentials" });
      }
      req.session.adminId = admin._id;
      // console.log(admin);

      res.status(200).json({ user: admin });
    } else {
      const user = await Users.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log("error");
        return res.status(401).json({ message: "Invalid credentials" });
      }
      req.session.userId = user._id;
      // console.log(user);

      res.status(200).json({ user });
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
