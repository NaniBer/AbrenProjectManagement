
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../Model/admin');
const Users = require('../Model/Users');


//User Account Created by The System Admin
router.post('/CreateUsers', async (req, res) => {
  try {
    const { firstname, lastname,username, password, email, status } = req.body;
    const createdBy = req.session.adminId;
    // Check if the user already exists
    const existingAccount = await Admin.findOne({username});
    if (existingAccount) {
      return res.status(409).json({ message: 'Account already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUsers = new Users({
      firstname,
      lastname,
      username,
      password: hashedPassword,
      email,
      status,
      createdBy
    });
    // Save the user to the database
    await newUsers.save();
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});


// System Adminstartor Login 
router.post('/Login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if the user exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.session.adminId = admin._id;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

//Update User Profile


 module.exports = router;