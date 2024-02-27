const mongoose = require('mongoose');

const ProjectDetailsSchema = mongoose.Schema({
    Project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    },
    TeamMembers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    Role: {
        type: String,
        required: true
    }
    

});
const ProjectDetails = mongoose.model('ProjectDetails', ProjectDetailsSchema);
module.exports= ProjectDetails;


