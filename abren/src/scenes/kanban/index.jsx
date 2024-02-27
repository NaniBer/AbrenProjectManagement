// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   MenuItem,
//   useTheme,
//   Modal,
//   Card,
//   CardContent,
//   IconButton
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { tokens } from '../../theme';
// import Header from '../../components/Header';
// import { color } from "@mui/system";

// const TaskCategory = ({ category, tasks }) => (
//   <div className="text-primary">
//     <h3>{category}</h3>
//     <ul>
//       {tasks.map((task) => (
//         <li key={task.id}>{task.taskName}</li>
//       ))}
//     </ul>
//   </div>
// );

// const Kanban = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [taskName, setTaskName] = useState("");
//   const [dueDate, setDueDate] = useState(new Date());
//   const [status, setStatus] = useState("");
//   const [priority, setPriority] = useState("");
//   const [submittedtask, setSubmittedTask] = useState([]);
//   const [editingTaskId, setEditingTaskId] = useState(null);

//   useEffect(() => {
//     setDueDate(new Date());
//   }, []);

//   const handleTaskNameChange = (e) => {
//     setTaskName(e.target.value);
//   };
//   const handleStatusChange = (e) => {
//     setStatus(e.target.value);
//   };
//   const handlePriorityChange = (e) => {
//     setPriority(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newTask = {
//       id: Math.random().toString(36).substr(2, 9),
//       taskName,
//       dueDate,
//       status,
//       priority,
//     };

//      const updatedTasks = submittedtask.map(task => {
//     if (task.id === editingTaskId) {
//       return {
//         ...task,
//         status,
//       };
//     }
//     return task;
//   });

//     setSubmittedTask((prevTask) => [...prevTask, newTask]);

//     setTaskName("");
//     setDueDate(new Date());
//     setStatus("");
//     setPriority("");

//     setIsFormOpen(false);
//   };

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const calculateDaysLeft = (dueDate) => {
//     const oneDay = 24 * 60 * 60 * 1000;
//     const today = new Date();
//     const due = new Date(dueDate);
//     const diffDays = Math.round((due - today) / oneDay); // Calculating difference with due date first

//     if (diffDays < 0) {
//       // If due date has passed
//       return "Overdue";
//     } else if (diffDays === 0) {
//       // If due date is today
//       return "Due today";
//     } else {
//       // If due date is in the future
//       return `${diffDays} days left`;
//     }
//   };
//   const handleDeleteTask = (taskId) => {
//     setSubmittedTask((prevTasks) => prevTasks.filter(task => task.id !== taskId));
//   };

//   const handleEditTask = (taskId) => {
//     // Find the task with the corresponding ID
//     const task = submittedtask.find(task => task.id === taskId);

//     // If the task is found, set its initial status in the state
//     if (task) {
//       setStatus(task.status);
//       setEditingTaskId(taskId); // Set the ID of the task being edited
//       setIsFormOpen(true); // Open the modal for editing
//     }
//   };

//   return (
//     <>
//       <Header title="Todo List" subtitle="Categorizes your tasks" />

//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Button
//           startIcon={<AddIcon />}
//           variant="contained"
//           onClick={() => setIsFormOpen(true)}
//           sx={{ color: 'white', backgroundColor: colors.primary[400], fontSize: '12px', fontWeight: 'bold', padding: '10px 20px', ml: '10px', mb:'15px' }}
//         >
//           Add Task
//         </Button>
//       </Box>

//       <Modal open={isFormOpen} onClose={() => setIsFormOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             maxWidth: 500,
//             width: "100%",
//             outline: "none",
//           }}
//         >
//           <Typography variant="h5" sx={{ mb: 2 }}>
//             Add Task
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Box sx={{ mb: 2 }}>
//               <TextField
//                 id="taskName"
//                 label="Task Name"
//                 variant="outlined"
//                 fullWidth
//                 value={taskName}
//                 onChange={handleTaskNameChange}
//                 sx={{
//                     '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                       borderColor:'#868dfb',
//                     },
//                   }}
//                   InputLabelProps={{
//                     shrink: true,
//                     sx: {
//                       '&.Mui-focused': {
//                         color:'#868dfb',
//                       },
//                     },
//                   }}
//               />
//             </Box>

//             {/* Using a simple text field for due date */}
//             <Box sx={{ mb: 2 }}>
//               <TextField
//                 id="dueDate"
//                 label="Due Date"
//                 type="date"
//                 variant="outlined"
//                 fullWidth
//                 value={dueDate.toISOString().slice(0, 10)}
//                 onChange={(e) => setDueDate(new Date(e.target.value))}
//                 sx={{
//                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor:'#868dfb',
//                   },
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                   sx: {
//                     '&.Mui-focused': {
//                       color:'#868dfb',
//                     },
//                   },
//                 }}
//               />
//             </Box>

//             <Box sx={{ mb: 2 }}>
//               <TextField
//                 id="status"
//                 select
//                 label="Status"
//                 variant="outlined"
//                 fullWidth
//                 value={status}
//                 onChange={handleStatusChange}
//                 sx={{
//                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor:'#868dfb',
//                   },
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                   sx: {
//                     '&.Mui-focused': {
//                       color:'#868dfb',
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="Not Started">Not Started</MenuItem>
//                 <MenuItem value="In Progress">In Progress</MenuItem>
//                 <MenuItem value="Completed">Completed</MenuItem>
//               </TextField>
//             </Box>

//             <Box sx={{ mb: 2 }}>
//               <TextField
//                 id="priority"
//                 select
//                 label="Priority"
//                 variant="outlined"
//                 fullWidth
//                 value={priority}
//                 onChange={handlePriorityChange}
//                 sx={{
//                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor:'#868dfb',
//                   },
//                 }}
//                 InputLabelProps={{
//                   shrink: true,
//                   sx: {
//                     '&.Mui-focused': {
//                       color:'#868dfb',
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="High">High</MenuItem>
//                 <MenuItem value="Medium">Medium</MenuItem>
//                 <MenuItem value="Low">Low</MenuItem>
//               </TextField>
//             </Box>

//             <Box display="flex" justifyContent="flex-end">
//               <Button type="submit" variant="contained">
//                 Submit
//               </Button>
//             </Box>
//           </form>
//         </Box>
//       </Modal>

//       <div className="container">
//         <div className="d-flex">
//           <div className="col">
//             <div className="card" style={{ backgroundColor: colors.blueAccent[300], marginRight: "10px" }}>
//               <div className="card-body">
//                 <h3 style={{color: colors.grey[900]}}>Todo</h3>
//                 {submittedtask
//                   .filter((task) => task.status === "Not Started")
//                   .map((task) => (
//                     <Card key={task.id} sx={{ mt: 1 , backgroundColor: 'fffff'}}>
//                   <CardContent>
//                   <Typography variant="body1" style={{ fontSize: '1.2rem', marginBottom: '8px'}}>{task.taskName}</Typography>

//                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginBottom: '8px' }}>
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <AccessTimeIcon style={{ marginBottom: '8px',marginRight: '4px' , color: colors.greenAccent[400]}} />
//                     <Typography variant="body2" sx={{ marginBottom: '8px', fontSize: '15px', paddingLeft: '25px' }}>
//                     {calculateDaysLeft(task.dueDate)} ({new Date(task.dueDate).toISOString().slice(0, 10)})
//                      </Typography>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
//                     <Typography variant="body2" sx={{ marginRight: '8px',fontSize: '15px', color: colors.greenAccent[400] }}>Priority:</Typography>
//                     <Button
//                     size="small"
//                     sx={{
//                       marginTop: "8px",
//                       padding: "6px 6px",
//                       height: "20px",
//                       width: "20px",
//                     }}
//                         variant="contained"
//                         color={
//                           task.priority === "High"
//                             ? "error"
//                             : task.priority === "Medium"
//                             ? "warning"
//                             : "success"
//                         }
//                       >
//                         {task.priority}
//                       </Button>
//                     </div>
//                   </div>
//                   <div style={{display: 'flex', justifyContent: 'flex-end'}}>

//                   <IconButton onClick={() => handleDeleteTask(task.id)} color="secondary" size = "small" sx={{paddingBottom: '1px'}}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </div>
//                 </CardContent>
//                     </Card>
//                   ))}
//               </div>
//             </div>
//           </div>
//           <div className="col">
//             <div className="card" style={{ backgroundColor: colors.blueAccent[300], marginRight: "10px" }}>
//               <div className="card-body" >
//                 <h3 style={{color: colors.grey[900]}}>In Progress</h3>
//                 {submittedtask
//                   .filter((task) => task.status === "In Progress")
//                   .map((task) => (
//                     <Card key={task.id} sx={{ mt: 1 , backgroundColor: 'fffff'}}>
//                  <CardContent>
//                   <Typography variant="body1" style={{ fontSize: '1.2rem', marginBottom: '8px'}}>{task.taskName}</Typography>

//                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginBottom: '8px' }}>
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <AccessTimeIcon style={{ marginBottom: '8px', marginRight: '4px' , color: colors.greenAccent[400]}} />
//                     <Typography variant="body2" sx={{ marginBottom: '8px', fontSize: '15px', paddingLeft: '25px' }}>
//                     {calculateDaysLeft(task.dueDate)} ({new Date(task.dueDate).toISOString().slice(0, 10)})
//                      </Typography>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
//                     <Typography variant="body2" sx={{ marginRight: '8px',fontSize: '15px', color: colors.greenAccent[400] }}>Priority:</Typography>
//                     <Button
//                     size="small"
//                     sx={{
//                       marginTop: "8px",
//                       padding: "6px 6px",
//                       height: "20px",
//                       width: "20px",
//                     }}
//                         variant="contained"
//                         color={
//                           task.priority === "High"
//                             ? "error"
//                             : task.priority === "Medium"
//                             ? "warning"
//                             : "success"
//                         }
//                       >
//                         {task.priority}
//                       </Button>
//                     </div>
//                   </div>
//                   <div style={{display: 'flex', justifyContent: 'flex-end'}}>

//                   <IconButton onClick={() => handleDeleteTask(task.id)} color="secondary" size = "small" sx={{paddingBottom: '1px'}}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </div>
//                 </CardContent>
//                     </Card>
//                   ))}
//               </div>
//             </div>
//           </div>
//           <div className="col">
//             <div className="card" style={{ backgroundColor: colors.blueAccent[300] }}>
//               <div className="card-body">
//                 <h3 style={{color: colors.grey[900]}}>Done</h3>
//                 {submittedtask
//                   .filter((task) => task.status === "Completed")
//                   .map((task) => (
//                     <Card key={task.id} sx={{ mt: 1 , backgroundColor: 'fffff'}}>
//                   <CardContent>
//                   <Typography variant="body1" style={{ fontSize: '1.2rem', marginBottom: '8px'}}>{task.taskName}</Typography>

//                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginBottom: '8px' }}>
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <AccessTimeIcon style={{ marginBottom: '8px',marginRight: '4px' , color: colors.greenAccent[400]}} />
//                     <Typography variant="body2" sx={{ marginBottom: '8px', fontSize: '15px', paddingLeft: '25px' }}>
//                     {calculateDaysLeft(task.dueDate)} ({new Date(task.dueDate).toISOString().slice(0, 10)})
//                      </Typography>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
//                     <Typography variant="body2" sx={{ marginRight: '8px',fontSize: '15px', color: colors.greenAccent[400] }}>Priority:</Typography>
//                     <Button
//                     size="small"
//                     sx={{
//                       marginTop: "8px",
//                       padding: "6px 6px",
//                       height: "20px",
//                       width: "20px",
//                     }}
//                         variant="contained"
//                         color={
//                           task.priority === "High"
//                             ? "error"
//                             : task.priority === "Medium"
//                             ? "warning"
//                             : "success"
//                         }
//                       >
//                         {task.priority}
//                       </Button>
//                     </div>

//                   </div>
//                   <div style={{display: 'flex', justifyContent: 'flex-end'}}>
//                   <IconButton onClick={() => handleDeleteTask(task.id)} color="secondary"
//                  size = "small" sx={{paddingBottom: '1px'}}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </div>
//                 </CardContent>

//                     </Card>
//                   ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Kanban;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";
import { PieChart, Pie, Cell } from "recharts"; // Import PieChart, Pie, and Cell components
import { projectData } from "../../data/mockData"; // Importing the dummy data

const Report = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const calculateProgressData = () => {
      const totalProgress = 70; // Assuming overall project progress
      setProgressData(totalProgress);
    };

    calculateProgressData();
  }, []);

  // Data for the pie chart
  const pieChartData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
  ];

  // Colors for the pie chart
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <Box m="20px">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ marginTop: "20px", borderRadius: "15px" }}>
            <CardContent sx={{ textAlign: "left" }}>
              <Typography variant="h4" sx={{ mb: 3, mt: 2 }}>
                <Typography variant="h3" component="span" sx={{ mr: 1 }}>
                  Project Name:{" "}
                </Typography>
                {projectData.projectName}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                <Typography component="span" sx={{ mr: 1 }}>
                  Report Date:{" "}
                </Typography>
                {projectData.reportDate}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                <Typography component="span" sx={{ mr: 1 }}>
                  Current Status:{" "}
                </Typography>
                {projectData.currentStatus}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                <Typography component="span" sx={{ mr: 1 }}>
                  Project Overview:{" "}
                </Typography>
                {projectData.projectOverview}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                <Typography component="span" sx={{ mr: 1 }}>
                  Milestones Achieved:
                </Typography>
              </Typography>
              <ul>
                {projectData.milestones.map((milestone, index) => (
                  <li key={index}>{milestone}</li>
                ))}
              </ul>
              <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                <Typography component="span" sx={{ mr: 1 }}>
                  Resource Allocation:
                </Typography>
              </Typography>
              <ul>
                <li>
                  Team Members:
                  <ul>
                    {projectData.resourceAllocation.teamMembers.map(
                      (member) => (
                        <li key={member.id}>
                          {member.name} - {member.role}
                        </li>
                      )
                    )}
                  </ul>
                </li>
                <li>Budget: {projectData.resourceAllocation.budget}</li>
                <li>Timeline: {projectData.resourceAllocation.timeline}</li>
                <li>Technology: {projectData.resourceAllocation.technology}</li>
                <li>Equipment: {projectData.resourceAllocation.equipment}</li>
                <li>Training: {projectData.resourceAllocation.training}</li>
                <li>
                  Other Resources:{" "}
                  {projectData.resourceAllocation.otherResources}
                </li>
              </ul>
              <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                <Typography component="span" sx={{ mr: 1 }}>
                  Next Steps and Action Items:
                </Typography>
              </Typography>
              <ul>
                {projectData.nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
                {projectData.actionItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <Box mt={2}>
                <LinearProgress
                  variant="determinate"
                  value={progressData}
                  sx={{
                    borderRadius: "10px",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: "15px",
                    },
                  }}
                />
                <Typography variant="body2" align="right">
                  {progressData}% Complete
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </Grid>
    </Box>
  );
};

export default Report;
