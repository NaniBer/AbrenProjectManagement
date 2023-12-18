const mongoose = require ('mongoose');

const TaskDetailsScehma = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: true
    },
    TeamMembers : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    Role: {
        type: String,
        required: true
    }
    
})
const TaskDetails = mongoose.model('TaskDetails', TaskDetailsScehma)
module.exports= TaskDetails;
