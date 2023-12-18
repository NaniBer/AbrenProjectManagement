const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    firstname: {
        type : String,
       // required: true
    },
    lastname: {
        type: String, 
        //required: true
    },
    username:{
        type: String, 
       // required: true,
        //unique: true
    },

    password: {
        type: String
    },

    email:{
        type: String, 
        //required: true,
       // unique: true
    } 
  
    
});

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;