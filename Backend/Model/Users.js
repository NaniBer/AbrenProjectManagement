const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['teammember', 'projectmanager']
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    // default: 'admin'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
});

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;