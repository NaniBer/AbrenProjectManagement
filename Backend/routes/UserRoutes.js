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


        const loggedInUserId= req.session.UserId;

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

       
        const validCategories = ['Material', 'Work', 'Cost'];
        if (!validCategories.includes(Category)) {
            return res.status(400).json({ success: false, error: 'Invalid Category' });
        }
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
UserRouter.put ('/updateResource/:ResourceName', async (req, res) =>{
    try {
        const {ResourceName } = req.params;
        const {Category, Quantity, CostCategory, Cost, Frequency, TotalCost } = req.body;

        const existingResource = await Resource.findOne({ResourceName: ResourceName});

        if (!existingResource) {
            return res.status(404).json({ success: false, error: 'Resource not found'});

            }
        existingResource.Category = Category || existingResource.Category;
        existingResource.Quantity = Quantity || existingResource.Quantity;
        existingResource.CostCategory = CostCategory || existingResource.CostCategory;
        existingResource.Cost = Cost || existingResource.Cost;
        existingResource.Frequency = Frequency || existingResource.Frequency;
        existingResource.TotalCost = TotalCost || existingResource.TotalCost;
        
    await existingResource.save();

    res.json({ success: true, updatedResource: existingResource})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});


//Delete Resources (one attribute taking Resource's Name)
UserRouter.put('deleteResource/:ResourceName', async (req, res) => {
    try{
        const { ResourceName }= req.params;
        const {deletedattribute }= req.body;

        const existingResource= await Resource.findOne({ ResourceName});
        if (!existingResource) {
            return res.status(404).json({ success: false, error:'resource not found'});

        }

        existingResource[deletedattribute]= undefined;

        await existingResource.save();
        res.json({ success:true, updatedResource: existingResource});
    } catch (error) { 
        console.error(error);
        res.status(500).json({ success: false, error: error.message });

    }

});
//Delete a certain Resource


UserRouter.delete('/deleteResource/:ResourceName', async (req, res) => {
    try {
        const { ResourceName } = req.params;
        const filter = { ResourceName };

        
        const result = await Resource.deleteOne(filter);

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, error: 'No record found for the given attribute' });
        }

        res.json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});



 //Generate report 


//Team Memeber 
//Add progress on the assigned task 


//Update progress on the assigned value



//Upload and share files and documents



module.exports= UserRouter;
