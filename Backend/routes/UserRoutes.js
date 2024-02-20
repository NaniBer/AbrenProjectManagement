const express = require('express');
const UserRouter = express.Router();
// const BudgetPlan = require('../Model/BudgetPlan');
 const Milestones = require('../Model/Milestones');
// const ProjectDetails = require('../Model/ProjectDetails');
const Projects = require('../Model/Projects');
const Resource = require('../Model/Resource');
// const ResourceConsumption = require('../Model/ResourceConsumption');
// const TaskDetails = require('../Model/TaskDetails');
const Tasks = require('../Model/Tasks');
const Todo = require('../Model/Todo');
// const Users = require('../Model/Users');

//project Manager
//assign tasks for team members 
UserRouter.post("/TaskAssign", async(req, res) => {
    try {
        const { TaskName, assignedTo, StartDate, EndDate, TaskDescription } = req.body;
        //const milestone = await Milestones.findById(milestone)
        const task = new Tasks({
          TaskName,
          assignedTo,
          StartDate,
          EndDate,
          TaskDescription,
        });
    
        await task.save();
    
        res.status(201).json({ message: 'Task assigned successfully', task });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    

//View progress of the task 
UserRouter.get("/TaskProgress/:TaskName", async(req, res) =>{
    try{
        const TaskName= req.params.TaskName;

        const task = await Tasks.findOne({ TaskName });
        
        if(!task) {
            return res.status(404).json({success: false, message: 'Task not found'})
        }
        res.json({ success: true, progress: task.status});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//view progress of the project 
UserRouter.get("/ProjectProgress/:ProjectName", async(req, res) =>{
    try{
        const ProjectName = req.params.ProjectName;
        const project = await Projects.findOne({ ProjectName});

        if(!project) {
            return res.status(404).json({success: false, message: 'Project not found'})

        }
        res.json({ success: true, progress: project.ProjectStatus});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }

});


//Add task to to-do list 


UserRouter.post('/addTodolist', async (req, res) => {
    try {
        const { TodoName, Date, TodoDescribtion, Status } = req.body;

        // Assuming you have a logged-in user and their ID is available in req.user
        // If not, you might want to implement authentication middleware to get the user ID
        const loggedInUserId= req.session.UserId;

        // Create a new Todo instance
        const todo = new Todo({
            TodoName,
            Date, 
            TodoDescribtion, 
            Status, 
            UserId: loggedInUserId, 
            
        });
        await todo.save();
        

        res.json({ success: true, todo});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//Add resoruce 

UserRouter.post('/addResource', async (req, res) => {
    try {
        const { projectId, ResourceName, Category, Quantity, CostCategory,Cost, Frequency, TotalCost } = req.body;

        // Example validation for 'Category'
        const validCategories = ['Material', 'Work', 'Cost'];
        if (!validCategories.includes(Category)) {
            return res.status(400).json({ success: false, error: 'Invalid Category' });
        }

        // Example validation for 'Cost'
        const validCostOptions = ['per Hour', 'per Person'];
        if (!validCostOptions.includes(CostCategory)) {
            return res.status(400).json({ success: false, error: 'Invalid Cost' });
        }

        const resource = new Resource({
            projectId,
            ResourceName,
            Category,
            Quantity,
            CostCategory,
            Cost,
            Frequency,
            TotalCost
        });

        await resource.save();

        res.json({ success: true, resource });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//Update resource


//Delete Resources


 //Generate report 


//Team Memeber 
//Add progress on the assigned task 


//Update progress on the assigned value



//Upload and share files and documents



module.exports= UserRouter;
