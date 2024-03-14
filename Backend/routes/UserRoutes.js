const express = require("express");
const mongoose = require("mongoose");

const UserRouter = express.Router();
// const BudgetPlan = require('../Model/BudgetPlan');
// const ProjectDetails = require('../Model/ProjectDetails');
const Projects = require("../Model/Projects");
const Resource = require("../Model/Resource");
const Milestones = require("../Model/Milestones");
// const ResourceConsumption = require('../Model/ResourceConsumption');
// const TaskDetails = require('../Model/TaskDetails');
const Tasks = require("../Model/Tasks");
const Todo = require("../Model/Todo");
const Users = require("../Model/Users");

//project Manager
//assign tasks for team members
UserRouter.post("/TaskAssign", async (req, res) => {
  try {
    const {
      TaskName,
      assignedTo,
      StartDate,
      EndDate,
      TaskDescription,
      projectId,
      subTasks,
    } = req.body;
    //const milestone = await Milestones.findById(milestone)
    const task = new Tasks({
      TaskName,
      assignedTo,
      StartDate,
      EndDate,
      TaskDescription,
      projectId,
      subTasks,
    });
    console.log(task);

    await task.save();

    res.status(201).json({ message: "Task assigned successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
UserRouter.put("/updateTask/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log(taskId);
    if (!taskId) {
      return res.status(400).json({ success: false, error: "Invalid Task ID" });
    }

    const {
      TaskName,
      StartDate,
      EndDate,
      TaskDescription,
      assignedTo,
      subTasks,
      projectId,
    } = req.body;

    const existingTask = await Tasks.findById(taskId);

    if (!existingTask) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    existingTask.TaskName = TaskName;
    existingTask.StartDate = StartDate;
    existingTask.EndDate = EndDate;
    existingTask.TaskDescription = TaskDescription;
    existingTask.assignedTo = assignedTo;
    existingTask.subTasks = subTasks;
    existingTask.projectId = projectId;

    await existingTask.save();

    console.log("Task Edited");
    res.status(200).json({ success: true, updatedTask: existingTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});
UserRouter.delete("/deleteTask/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const result = await Tasks.deleteOne({ _id: taskId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "No record found for the given ID",
      });
    }
    console.log("Deleted Task");
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//View progress of the task
UserRouter.get("/TaskProgress/:TaskName", async (req, res) => {
  try {
    const TaskName = req.params.TaskName;

    const task = await Tasks.findOne({ TaskName });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, progress: task.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//view progress of the project
UserRouter.get("/ProjectProgress/:ProjectName", async (req, res) => {
  try {
    const ProjectName = req.params.ProjectName;
    const project = await Projects.findOne({ ProjectName });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, progress: project.ProjectStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//Add task to to-do list

UserRouter.post("/addTodolist", async (req, res) => {
  try {
    const { TodoName, Date, Priority, Status } = req.body;

    const loggedInUserId = req.session.userId;

    const todo = new Todo({
      TodoName,
      Date,
      Priority,
      Status,
      UserId: loggedInUserId,
    });

    await todo.save();
    res.status(201).json({ success: true, todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//View All Todo
UserRouter.get("/view", async (req, res) => {
  try {
    const loggedInUserId = req.session.userId;

    // Retrieve all todos where UserId matches the logged-in user's ID
    const todos = await Todo.find({ UserId: loggedInUserId });

    res.status(200).json({ success: true, todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Todo
UserRouter.delete("/delete/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    // console.log(taskId);

    // Check if the todo exists
    const todo = await Todo.findById(taskId);
    console.log(todo);
    if (!todo) {
      return res.status(404).json({ success: false, error: "Todo not found" });
    }

    // Check if the todo belongs to the logged-in user
    if (todo.UserId !== req.session.userId) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    // Delete the todo
    await Todo.findByIdAndDelete(taskId);
    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//Add resoruce

UserRouter.post("/addResource", async (req, res) => {
  try {
    const {
      projectId,
      ResourceName,
      Category,
      Quantity,
      CostCategory,
      Cost,
      Frequency,
    } = req.body;

    // Check if the project exists
    const project = await Projects.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }

    const validCategories = ["Material", "Work"];
    if (!validCategories.includes(Category)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Category" });
    }

    const validCostOptions = ["per unit of time", "per Item", "one-time"];
    if (!validCostOptions.includes(CostCategory)) {
      return res.status(400).json({ success: false, error: "Invalid Cost" });
    }

    const resource = new Resource({
      projectId,
      ResourceName,
      Category,
      Quantity,
      CostCategory,
      Cost,
      Frequency,
    });

    if (resource.Frequency === 0) {
      resource.TotalCost = resource.Quantity * resource.Cost;
    } else {
      resource.TotalCost =
        resource.Quantity * resource.Cost * resource.Frequency;
    }

    console.log(resource);

    await resource.save();

    res.status(201).json({ success: true, resource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//Update resource
UserRouter.put("/updateResource/:id", async (req, res) => {
  try {
    const resourceId = req.params.id;
    if (!resourceId) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid resource ID" });
    }

    const { ResourceName, Category, Quantity, CostCategory, Cost, Frequency } =
      req.body;

    const existingResource = await Resource.findById(resourceId);

    if (!existingResource) {
      return res
        .status(404)
        .json({ success: false, error: "Resource not found" });
    }

    existingResource.ResourceName = ResourceName;
    existingResource.Category = Category;
    existingResource.Quantity = Quantity;
    existingResource.CostCategory = CostCategory;
    existingResource.Cost = Cost;
    existingResource.Frequency = Frequency;

    // Calculate TotalCost based on Frequency
    if (Frequency === 0) {
      existingResource.TotalCost = Quantity * Cost;
    } else {
      existingResource.TotalCost = Quantity * Cost * Frequency;
    }

    await existingResource.save();
    console.log("Resource Edited");
    res.status(200).json({ success: true, updatedResource: existingResource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});
UserRouter.get("/activeUsers", async (req, res) => {
  try {
    const currentUserID = req.session.userId;
    // const currentUserID = "65ddc5ae6daf913004c5aa42";

    // Find all active users excluding the current user
    const activeUsers = await Users.find({
      disabled: false,
      _id: { $ne: currentUserID },
    });

    res.json(activeUsers);
  } catch (error) {
    console.error("Error retrieving active users:", error);
    res.status(500).json({ message: "Error retrieving active users" });
  }
});

UserRouter.post("/addProjectDetails/:projectId", async (req, res) => {
  try {
    console.log("Adding project details");
    const { Budget, teamMembers, StartDate, EndDate } = req.body;
    const projectId = req.params.projectId;
    const teamMemberIds = teamMembers.map((member) => member._id);
    console.log(teamMembers);
    // Find the project by ID
    const project = await Projects.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update project details
    project.Budget = Budget;
    project.teamMembers = teamMemberIds;
    project.StartDate = StartDate;
    project.EndDate = EndDate;

    // Save the updated project
    const updatedProject = await project.save();
    console.log(updatedProject);

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error adding project details:", error);
    res.status(500).json({ message: "Error adding project details" });
  }
});

//Test route
UserRouter.get("/project/", async (req, res) => {
  try {
    // Get the count of task records
    const taskCount = await Tasks.countDocuments({});

    // Log the count to the console
    console.log("Number of task records:", taskCount);

    // Delete all task records
    const projectList = await Tasks.deleteMany({});

    // Respond with the list of deleted tasks
    res.json(projectList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//Delete Resources (one attribute taking Resource's Name)
UserRouter.put("deleteResource/:ResourceName", async (req, res) => {
  try {
    const { ResourceName } = req.params;
    const { deletedattribute } = req.body;

    const existingResource = await Resource.findOne({ ResourceName });
    if (!existingResource) {
      return res
        .status(404)
        .json({ success: false, error: "resource not found" });
    }

    existingResource[deletedattribute] = undefined;

    await existingResource.save();
    res.json({ success: true, updatedResource: existingResource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});
//Delete a certain Resource
UserRouter.delete("/deleteResource/:id", async (req, res) => {
  try {
    const resourceId = req.params.id;
    const result = await Resource.deleteOne({ _id: resourceId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "No record found for the given ID",
      });
    }
    console.log("Deleted resource");
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

//Upload and sare files and documents

//Get all involved Projects
UserRouter.post("/getProjects", async (req, res) => {
  try {
    const projectList = await Projects.find({
      ProjectManager: req.body.id,
    }).select("ProjectName ProjectDescription");

    res.status(200).json(projectList);
  } catch (err) {
    console.error("Error retrieving Admin list:", err);
    res.status(500).json({ message: "Error rerieving admin list" });
  }
});

// Get information of the project
UserRouter.post("/getProject/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const objectId = new mongoose.Types.ObjectId(projectId);
    const project = await Projects.aggregate([
      { $match: { _id: objectId } },
      {
        $lookup: {
          from: "milestones", // Name of the Milestones collection
          localField: "_id",
          foreignField: "projectId",
          as: "milestones",
        },
      },
      {
        $lookup: {
          from: "resources",
          localField: "_id",
          foreignField: "projectId",
          as: "resources",
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "projectId",
          as: "tasks",
        },
      },
      {
        $lookup: {
          from: "users", // Assuming user details are stored in the "users" collection
          localField: "ProjectManager", // Assuming ProjectManager field stores user ObjectId
          foreignField: "_id",
          as: "projectManagerDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "teamMembers",
          foreignField: "_id",
          as: "teamMembersDetails",
        },
      },
      // Projection stage to include team members' names
      {
        $addFields: {
          teamMembers: {
            $map: {
              input: "$teamMembersDetails",
              as: "member",
              in: {
                _id: "$$member._id",
                name: {
                  $concat: ["$$member.firstname", " ", "$$member.lastname"],
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          projectManager: {
            $arrayElemAt: ["$projectManagerDetails", 0],
          },
        },
      },
      {
        $lookup: {
          from: "ProjectDetails",
          localField: "_id",
          foreignField: "projectId",
          as: "projectDetails",
        },
      },
      {
        $project: {
          projectManagerDetails: 0, // Exclude projectManagerDetails array from final result
          teamMembersDetails: 0,
          // TeamMembers: 0,
        },
      },
    ]);
    console.log(project);

    if (!project || project.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the logged-in user is authorized to view this project
    // if (project[0].ProjectManager.toString() !== req.session.userId) {
    //   return res.status(403).json({ message: "Unauthorized" });
    // }
    console.log(project[0]);

    res.status(200).json(project[0]);
  } catch (err) {
    console.error("Error retrieving project:", err);
    res.status(500).json({ message: "Error retrieving project" });
  }
});

//Add Milestone

UserRouter.post("/addMilestone", async (req, res) => {
  try {
    const {
      projectId,
      MilestoneName,
      MilestoneDescription,
      ResourceId,
      ResourceQuantity,
      AllocatedBudget,
      Priority,
      Status,
    } = req.body;

    // Check if the project exists
    const project = await Projects.findById(projectId);
    console.log(
      projectId,
      MilestoneName,
      MilestoneDescription,
      ResourceId,
      ResourceQuantity,
      AllocatedBudget,
      Priority,
      Status
    );
    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }
    const milestone = new Milestones({
      projectId,
      MilestoneName,
      MilestoneDescription,
      ResourceId,
      ResourceQuantity,
      AllocatedBudget,
      Priority,
      Status,
    });

    console.log(milestone);

    await milestone.save();
    console.log("New milestone added");

    res.status(201).json({ success: true, milestone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//Update Milestone
UserRouter.put("/updateMilestone/:id", async (req, res) => {
  try {
    console.log("Editing");
    const milestoneId = req.params.id;
    if (!milestoneId) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Milestone ID" });
    }

    const {
      MilestoneName,
      MilestoneDescription,
      ResourceId,
      ResourceQuantity,
      AllocatedBudget,
      Priority,
      Status,
    } = req.body;

    const existingMilestone = await Milestones.findById(milestoneId);

    if (!existingMilestone) {
      return res
        .status(404)
        .json({ success: false, error: "Milestone not found" });
    }

    existingMilestone.MilestoneName = MilestoneName;
    existingMilestone.MilestoneDescription = MilestoneDescription;
    existingMilestone.ResourceId = ResourceId;
    existingMilestone.AllocatedBudget = AllocatedBudget;
    existingMilestone.ResourceQuantity = ResourceQuantity;
    existingMilestone.Priority = Priority;
    existingMilestone.Status = Status;

    await existingMilestone.save();
    console.log("Milestone Edited");
    res
      .status(200)
      .json({ success: true, updatedMilestone: existingMilestone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//Delete a certain Milestone
UserRouter.delete("/deleteMilestone/:id", async (req, res) => {
  try {
    const milestoneId = req.params.id;
    const result = await Milestones.deleteOne({ _id: milestoneId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "No record found for the given ID",
      });
    }
    console.log("Deleted Milestone");
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = UserRouter;
