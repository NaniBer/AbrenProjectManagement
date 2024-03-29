const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    ProjectName : {
        type : String,
        required : true
    }, 
    StartDate : {
        type: Date, 
        //required : true
    },
    EndDate : {
        type: Date,
        //required : true

    },
    ProjectDescription : {
        type: String, 
        //requred : true, 

    }, 
    ProjectManager : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        //required : true
    },
    EstimatedCost :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Resource',
       // required: true
     },
     AllocatedCost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BudgetPlan',
        //required: true
     },
     ProjectStatus : {
        type : String, 
     //   required : true
     }
});
const Projects = mongoose.model('Projects', ProjectSchema);
module.exports = Projects;
