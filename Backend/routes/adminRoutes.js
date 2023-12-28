const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../Model/admin");
const Projects = require("../Model/Projects");
const Users = require("../Model/Users");

// System Adminstartor Login
router.post("/Login", async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;
    // Check if the user exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.adminId = admin._id;

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

router.post("/addAdmin", async (req, res) => {
  try {
    const username = "admin";
    const password = "admin";
    // Check if the admin already exists
    const existingAccount = await Admin.findOne({ username });
    if (existingAccount) {
      return res.status(409).json({ message: "Account already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    console.log(newAdmin);
    await newAdmin.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

//Get admin users list
router.get("/getAdminList", async (req, res) => {
  try {
    const adminsList = await Admin.find();
    res.json(adminsList);
  } catch (err) {
    console.error("Error retrieving Admin list:", err);
    res.status(500).json({ message: "Error rerieving admin list" });
  }
});

//User Account Created by The System Admin
router.post("/CreateUsers", async (req, res) => {
  try {
    const { firstName, lastName, username, password, email } = req.body;

    // const createdBy = req.session.adminId;
    const createdBy = "65842e544adaddc07c71d473";
    // Check if the user already exists
    const existingAccount = await Users.findOne({ username });
    if (existingAccount) {
      return res.status(409).json({ message: "Account already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUsers = new Users({
      firstname: firstName,
      lastname: lastName,
      username,
      password: hashedPassword,
      email,
      createdBy,
    });

    // Save the user to the database
    await newUsers.save();
    console.log("Created Successfully");
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

//updating user
router.put("/UpdateUser/:id", async (req, res) => {
  try {
    const { firstname, lastname, email, status, username, password, disabled } =
      req.body;
    // const updatedBy = req.session.adminId;
    const userId = req.params.id;

    // Check if the user exists
    const existingUser = await Users.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's information
    existingUser.firstname = firstname;
    existingUser.lastname = lastname;
    existingUser.email = email;
    existingUser.username = username;
    existingUser.disabled = disabled;
    // existingUser.updatedBy = updatedBy;

    // If a new password is provided, hash and update it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
    }

    // Save the updated user to the database
    await existingUser.save();

    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});

//create project
router.post("/CreateProject", async (req, res) => {
  try {
    const { ProjectName, ProjectDescription, ProjectManager } = req.body;
    // const createdBy = req.session.adminId;
    // Check if the user already exists
    const existingProject = await Admin.findOne({ ProjectName });
    if (existingProject) {
      return res.status(409).json({ message: "Project already exists" });
    }
    // Create a new Project
    const newProject = new Projects({
      ProjectName,
      ProjectDescription,
      ProjectManager,
    });

    // Save the Project to the database
    await newProject.save();
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    console.error("Error creating Project:", error);
    res.status(500).json({ message: "Error creating Project" });
  }
});

//Reset Admin
router.put("/ResetAdmin", async (req, res) => {
  try {
    // Find the admin document in the database
    const admin = await Admin.findOne();

    // Update the admin credentials to their default values
    admin.username = "admin";
    admin.password = "admin123";

    // Save the updated admin document
    await admin.save();

    res.status(200).json({ message: "Admin credentials reset successfully" });
  } catch (error) {
    console.error("Error resetting admin credentials:", error);
    res.status(500).json({ message: "Error resetting admin credentials" });
  }
});

//View Users
router.get("/getUsers", async (req, res) => {
  try {
    const usersList = await Users.find();
    res.json(usersList);
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({ message: "Error rerieving user list" });
  }
});

//updating Project

//update Admin
// router.put('/UpdateAdmin', async (req, res) => {
//   try {
//     const { username, oldPassword, newPassword } = req.body;

//     // Find the admin user by username
//     const adminUser = await Admin.findOne({ username });

//     if (!adminUser) {
//       return res.status(404).json({ message: 'Admin user not found' });
//     }

//     // Verify the old password
//     const isPasswordValid = await bcrypt.compare(oldPassword, adminUser.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid old password' });
//     }

//     // Generate a new password hash
//     const newPasswordHash = await bcrypt.hash(newPassword, 10);

//     // Update the admin user's password
//     adminUser.password = newPasswordHash;

//     // Save the updated admin user
//     await adminUser.save();

//     res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error('Error updating admin password:', error);
//     res.status(500).json({ message: 'Error updating admin password' });
//   }
// });
module.exports = router;
