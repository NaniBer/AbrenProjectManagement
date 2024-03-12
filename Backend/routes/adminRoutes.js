const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../Model/admin");
const Projects = require("../Model/Projects");
const Users = require("../Model/Users");

// System Adminstartor Login
router.post("/Login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    // Check if the user exists
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
    console.log(admin);

    res.status(200).json({ admin });
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

router.post("/addAdmin", async (req, res) => {
  try {
    const username = "admin123";
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
router.get("/getAdmins", async (req, res) => {
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

    const createdBy = req.session.adminId;
    //const createdBy = "65842e544adaddc07c71d473";
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
router.put("/updateUser/:id", async (req, res) => {
  try {
    const { firstName, lastName, username, email } = req.body;

    // const updatedBy = req.session.adminId;
    const userId = req.params.id;
    console.log(userId, firstName, lastName, username, email);

    // Check if the user exists
    const existingUser = await Users.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's information
    existingUser.firstname = firstName;
    existingUser.lastname = lastName;
    existingUser.email = email;
    existingUser.username = username;
    // existingUser.disabled = disabled;
    // existingUser.updatedBy = updatedBy;
    // Save the updated user to the database
    await existingUser.save();

    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});

//Delete Users
router.delete("/deleteUsers/:id", async (req, res) => {
  try {
    const deletedUser = await Users.deleteOne({ _id: req.params.id });
    console.log(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/disableUsers/:id", async (req, res) => {
  try {
    const status = req.body.newStatus;
    const id = req.params.id;
    if (status == "inactive") {
      const result = await Users.updateOne(
        { _id: id },
        { $set: { disabled: true } }
      );
    } else {
      const result = await Users.updateOne(
        { _id: id },
        { $set: { disabled: false } }
      );
    }
    console.log("Successful");
    res.status(200);

    console.log(status, id);
  } catch (err) {
    res.json({ message: err });
  }
});

//create project
router.post("/CreateProject", async (req, res) => {
  try {
    const { ProjectName, ProjectDescription, ProjectManager } = req.body;
    console.log(req.body);
    // const createdBy = req.session.adminId;
    // Check if the user already exists
    const existingProject = await Admin.findOne({ ProjectName });
    if (existingProject) {
      return res.status(409).json({ message: "Project already exists" });
    }
    //Search for project manager id
    const user = await Users.findOne({ username: ProjectManager });
    const ProjectManagerId = user._id;
    // Create a new Project
    const newProject = new Projects({
      ProjectName,
      ProjectDescription,
      ProjectManager: ProjectManagerId,
    });
    console.log(newProject);

    // Save the Project to the database
    await newProject.save();
    console.log("Successful");
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    console.error("Error creating Project:", error);
    res.status(500).json({ message: "Error creating Project" });
  }
});

//Get Usernames
router.get("/getUsernames", async (req, res) => {
  try {
    const usernames = await Users.find().select("username");
    res.json(usernames);
  } catch (err) {
    console.error("Error retrieving Admin list:", err);
    res.status(500).json({ message: "Error rerieving admin list" });
  }
});
router.get("/test", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    console.error("Error retrieving Admin list:", err);
    res.status(500).json({ message: "Error rerieving admin list" });
  }
});

//Reset Admin
router.put("/ResetAdmin", async (req, res) => {
  try {
    // Find the admin document in the database
    const admin = await Admin.findOne();

    // Update the admin credentials to their default values
    admin.username = "admin";
    admin.password = "admin";

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

//View Projects
router.get("/getProjects", async (req, res) => {
  try {
    // const projectList = await Projects.find();
    // res.json(projectList);
    const projectList = await Projects.find()
      .populate("ProjectManager", "username")
      .select("ProjectName ProjectDescription ProjectManager");

    res.json(projectList);
  } catch (err) {
    console.error("Error retrieving projects:", err);
    res.status(500).json({ message: "Error rerieving Project list" });
  }
});

//delete projects
router.delete("/deleteProjects/:id", async (req, res) => {
  try {
    const deletedProject = await Projects.deleteOne({ _id: req.params.id });
    console.log(req.params.id);
    res.status(200).json(deletedProject);
  } catch (err) {
    res.json({ message: err });
  }
});
//updating Project
router.put("/updateProjects/:id", async (req, res) => {
  try {
    const { id, ProjectName, ProjectDescription, ProjectManager } = req.body;
    // console.log(id, ProjectName, ProjectDescription, ProjectManager);
    const user = await Users.findOne({ username: ProjectManager });
    const ProjectManagerId = user._id;
    const updatedBusiness = await Projects.updateOne(
      { _id: id },
      {
        $set: {
          ProjectName: ProjectName,
          ProjectDescription: ProjectDescription,
          ProjectManager: ProjectManagerId,
        },
      }
    );
    console.log(updatedBusiness);
    res.status(200).json(updatedBusiness);
  } catch (err) {
    res.json({ message: err });
  }
});

// update Admin
router.put("/UpdateAdmin", async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    // Find the admin user by username
    const adminUser = await Admin.findOne({ username });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Verify the old password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      adminUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Generate a new password hash
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update the admin user's password
    adminUser.password = newPasswordHash;

    // Save the updated admin user
    await adminUser.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating admin password:", error);
    res.status(500).json({ message: "Error updating admin password" });
  }
});

//reset Password
router.put("/ResetAdmin", async (req, res) => {
  try {
    //     const { username, currentPassword, newPassword } = req.body;

    // Find the admin user by username
    const adminUser = await Admin.findOne({ username });

    //     if (!adminUser) {
    //       return res.status(404).json({ message: 'Admin user not found' });
    //     }

    //     // Verify the old password
    //     const isPasswordValid = await bcrypt.compare(oldPassword, adminUser.password);

    //     if (!isPasswordValid) {
    //       return res.status(401).json({ message: 'Invalid old password' });
    //     }

    // Generate a new password hash
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update the admin user's password
    adminUser.password = newPasswordHash;

    // Save the updated admin user
    await adminUser.save();

    //     res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error("Error updating admin password:", error);
    res.status(500).json({ message: "Error updating admin password" });
  }
});
module.exports = router;
