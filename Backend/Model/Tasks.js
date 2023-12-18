const mongoose = require ('mongoose');
const { schema } = require('./admin');
const TasksSchema = mongoose.Schema({
    milestone : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    TaskName : {
        type: String,
        required: true
    },
    StartDate : {
        type: Date, 
        required : true
    },
    EndDate: {
        type: Date,
        required: true
    },
    TaskDescription : {
        type: String,
        required: true
    },
    InitiatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})
const Tasks = mongoose.model('Tasks', TasksSchema)
module.exports = Tasks;
