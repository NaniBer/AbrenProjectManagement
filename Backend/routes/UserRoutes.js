const express = require('express');
const UserRouter = express.Router();
const BudgetPlan = require('../Model/BudgetPlan');
const Milestones = require('../Model/Milestones');
const ProjectDetails = require('../Model/ProjectDetails');
const Projects = require('../Model/Projects');
const Resource = require('../Model/Resource');
const ResourceConsumption = require('../Model/ResourceConsumption');
const TaskDetails = require('../Model/TaskDetails');
const Tasks = require('../Model/Tasks');
const Todo = require('../Model/Todo');
const Users = require('../Model/Users');






module.exports= UserRouter;
