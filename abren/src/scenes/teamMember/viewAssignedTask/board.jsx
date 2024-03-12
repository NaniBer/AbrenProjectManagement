import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Checkbox, Button, Modal } from '@mui/material';
import {FaCheck} from 'react-icons/fa';
import { tokens } from '../../../theme';
import { useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import swal from 'sweetalert';
// import updatedTasks from "../../../data/mockData";

function TaskList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tasks, setTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [subtaskChecked, setSubtaskChecked] = useState([]);

  const dummyTaskData = {
    name: 'Task 1',
    startDate: '2024-03-09',
    endDate: '2024-03-12',
    project: 'Project X',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id turpis at urna tincidunt sodales sed id turpis. Mauris non leo a metus tempus gravida.',
    subtasks: ['Subtask 1', 'Subtask 2', 'Subtask 3'],
  };

  useEffect(() => {
    // Calculate categories based on dates
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Remove time from today's date
    const upcomingLimit = new Date(today); // Date for considering tasks as upcoming (e.g., tasks after today)
    upcomingLimit.setDate(upcomingLimit.getDate() + 1); // Consider tasks after today as upcoming

    const updatedTasks = [
      { id: 1, name: 'Task 1', date: '2024-03-04', project: 'Project A', completed: false },
      { id: 2, name: 'Task 2', date: '2024-03-08', project: 'Project B', completed: false },
      { id: 3, name: 'Task 3', date: '2024-03-09', project: 'Project C', completed: false },
      { id: 4, name: 'Task 4', date: '2024-03-09', project: 'Project D', completed: false },
      { id: 5, name: 'Task 5', date: '2024-03-10', project: 'Project E', completed: false },
      { id: 6, name: 'Task 6', date: '2024-03-05', project: 'Project F', completed: false },
      { id: 7, name: 'Task 7', date: '2024-03-15', project: 'Project G', completed: false },
    ].map(task => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 to compare only the date part
      if (taskDate.getTime() === today.getTime()) {
        return { ...task, category: 'today' };
      } else if (taskDate > today && taskDate <= upcomingLimit) {
        return { ...task, category: 'upcoming' };
      } else if (taskDate < today) {
        return { ...task, category: 'recent' };
      } else {
        return { ...task, category: 'overdue' };
      }
    });

    setTasks(updatedTasks);
  }, []);

  function calculateDueDate(startDate, endDate) {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);
    const today = new Date();

    const diffTime = formattedEndDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    if (diffDays < 0) {
      return `Overdue ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays === 2) {
      return 'Day after Tomorrow';
    } else {
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      return formattedEndDate.toLocaleDateString(undefined, options);
    }
  }

  const handleMenuOpen = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const moveTask = (newCategory) => {
    const updatedTasks = tasks.map(task =>
      task.id === selectedTaskId ? { ...task, category: newCategory } : task
    );
    setTasks(updatedTasks);
    handleMenuClose();
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  
    const selectedTask = tasks.find(task => task.id === taskId);
    if (selectedTask.completed) {
      swal({
        title: "Mark Task as Incomplete?",
        text: "Do you want to mark this task as incomplete?",
        // icon: "info",
        buttons: ["Cancel", "Mark Incomplete"],
      }).then((willMarkIncomplete) => {
        if (willMarkIncomplete) {
          // Handle marking task as incomplete
        } else {
          // Revert checkbox state
          toggleTaskCompletion(taskId);
        }
      });
    } else {
      swal({
        title: "Task Completed?",
        text: "Do you want to remove it from the list?",
        icon: "info",
        buttons: ["Cancel", "Remove"],
      }).then((willRemove) => {
        if (willRemove) {
          const updatedTasks = tasks.filter(task => task.id !== taskId);
          setTasks(updatedTasks);
          swal("Task Removed!", {
            icon: "success",
          });
          setSelectedRowData(null);
        }
      });
    }
  };
  
  const handleTaskClick = (task) => {
    setSelectedRowData(task);
    setSubtaskChecked(task.subtasks ? Array(task.subtasks.length).fill(false) : []);
  };
  

  const handleCheckboxChange = (index) => {
    const updatedChecked = [...subtaskChecked];
    updatedChecked[index] = !updatedChecked[index];
    setSubtaskChecked(updatedChecked);
  };

  const kanbanColumns = [
    { id: 'recent', title: 'Recently Assigned' },
    { id: 'today', title: 'Today' },
    { id: 'upcoming', title: 'Upcoming' },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {kanbanColumns.map(column => (
          <Grid item xs={12} md={4} key={column.id}>
            <Box p={2} bgcolor={colors.primary[100]} borderRadius={4} sx={{backgroundColor: colors.blueAccent[300]}}>
              <Typography variant="h3" gutterBottom style={{color: colors.grey[900]}}>{column.title}</Typography>
              {tasks.filter(task => task.category === column.id).map(task => (
                <Card key={task.id} variant="outlined" sx={{ marginBottom: 2 }}>
                  <CardContent sx={{ position: 'relative' }}>
                    <Box sx={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' }}>
                      <Checkbox
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        sx={{
                            position: 'absolute',
                            marginBottom: '10px',
                            marginLeft: '-10px',
                            '& .MuiIconButton-root': {
                                borderRadius: '50%',
                            },
                            '& .MuiSvgIcon-root': {
                                width: '1em',
                                height: '1em',
                            },
                            '&.Mui-checked .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                        }}
                      />
                      <Typography
                        variant="body1"
                        style={{ marginBottom: '8px', paddingLeft: '25px', cursor: 'pointer' }}
                        onClick={() => handleTaskClick(task)}
                      >
                        {task.name}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{color: colors.greenAccent[400]}}>{task.date}</Typography>
                  </CardContent>             
                </Card>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal open={selectedRowData !== null} onClose={() => setSelectedRowData(null)}>
        <Box
          sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: colors.primary[400], borderRadius: '20px', boxShadow: 24, p: 4, maxWidth: 600, height: '80%', width: '100%', outline: 'none', overflow: 'auto' }}
        >
          <Typography variant="h2" sx={{ color: colors.primary[110], paddingBottom: '15px' }} gutterBottom>
            Task Details
          </Typography>
          {selectedRowData && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                <Typography variant="h5" component="span" sx={{ color: colors.greenAccent[400], paddingTop: '10px', paddingBottom: '10px' }}>Task Name: </Typography>{dummyTaskData.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <AccessTimeIcon color="secondary" />
                <Typography variant="body1" component="span" sx={{ color: colors.greenAccent[400], paddingLeft: '10px', paddingBottom: '10px' }}></Typography> {calculateDueDate(dummyTaskData.startDate, dummyTaskData.endDate)}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <Typography variant="h5" sx={{ color: colors.greenAccent[400], paddingTop: '10px' }}> Description:</Typography> {dummyTaskData.description}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <Typography variant="h5" component="span" sx={{ color: colors.greenAccent[400], paddingBottom: '10px' }}>
                  Subtasks:
                </Typography>
              </Typography>
              {dummyTaskData.subtasks && dummyTaskData.subtasks.map((subtask, index) => (
                <Box key={index} display="flex" alignItems="center" gutterBottom>
                  <Checkbox color="secondary" checked={subtaskChecked[index]} onChange={() => handleCheckboxChange(index)} />
                  <Typography variant="body2" gutterBottom style={{ color: subtaskChecked[index] ? 'grey' : 'inherit' }}>
                    {subtask}
                  </Typography>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaCheck />}
                onClick={() => toggleTaskCompletion(selectedRowData.id)}
                sx={{ position: 'absolute', bottom: '20px', right: '20px' }}
              >
                Mark as Completed
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default TaskList;
