const mongoose = require ('mongoose');

const TaskDetailsScehma = new mongoose.Schema({
    TasksId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks',
        required: true
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    ResourceId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
    },
    ResourceNeed: {
        type: Number,
        required: true
    },
    ResourceUsed: {
        type: Number,
        required: true
    }
    
})
const TaskDetails = mongoose.model('TaskDetails', TaskDetailsScehma)
module.exports= TaskDetails;
