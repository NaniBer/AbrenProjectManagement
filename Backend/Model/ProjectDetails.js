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
        Type: String,
        Required: true
    }
    

});
const ProjectDetails = mongoose.model('ProjectDetails', ProjectDetailsSchema);
module.exports= ProjectDetails;


