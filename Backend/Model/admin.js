const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    //unique: true
  },

  password: {
    type: String,
  },
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
