import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FaAngleDown } from 'react-icons/fa';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import { tokens } from '../../../theme';
import { Box, Button, useTheme, Modal, Typography, Checkbox , Slider} from '@mui/material';
import swal from 'sweetalert';
import { assignedTask } from '../../../data/mockData';

function TaskList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dummyTaskData = [
    {
      id: 1,
      name: 'Task 1',
      startDate: '2024-03-09',
      endDate: '2024-03-12',
      project: 'Project X',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id turpis at urna tincidunt sodales sed id turpis. Mauris non leo a metus tempus gravida.',
      subtasks: [
        { name: "Subtask 1", status: "Not completed" },
        { name: "Subtask 2", status: "Not completed" },
        { name: "Subtask 3", status: "Not completed" }
      ],
    },
    {
      id: 2,
      name: 'Task 2',
      startDate: '2024-03-13',
      endDate: '2024-03-14',
      project: 'Project Y',
      description: 'Nullam non bibendum lectus. Donec ac ultricies libero. Sed eget dapibus odio.',
      subtasks: [
        { name: "Subtask A", status: "Not completed" },
        { name: "Subtask B", status: "Not completed" },
        { name: "Subtask C", status: "Not completed" },
        { name: "Subtask D", status: " completed" }

      ],
    },
    {
      id: 3,
      name: 'Task 3',
      startDate: '2024-03-19',
      endDate: '2024-03-25',
      project: 'Project Z',
      description: 'Fusce auctor elit at magna feugiat, nec lacinia mi tempus. Fusce nec ex id magna gravida ultrices.',
    },
    {
      id: 4,
      name: 'Task 4',
      startDate: '2024-03-14',
      endDate: '2024-03-15',
      project: 'Project W',
      description: 'Quisque vestibulum magna et libero ultricies, quis porttitor eros gravida.',
    },
    {
      id: 5,
      name: 'Task 5',
      startDate: '2024-03-15',
      endDate: '2024-03-15',
      project: 'Project V',
      description: 'Vestibulum consequat nisl et fermentum luctus. Fusce sit amet semper mauris.',
    },
    {
      id: 6,
      name: 'Task 6',
      startDate: '2024-03-18',
      endDate: '2024-03-20',
      project: 'Project U',
      description: 'Etiam malesuada felis at purus suscipit, in convallis ex fringilla.',
    },
  ];

  const [showRecent, setShowRecent] = useState(false);
  const [showToday, setShowToday] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [subtaskChecked, setSubtaskChecked] = useState([]);
  const [taskProgress, setTaskProgress] = useState(0);

  useEffect(() => {
    // Calculate categories based on dates
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Remove time from today's date
  
    const updatedTasks = dummyTaskData.map(task => {
      const taskDate = new Date(task.endDate);
      taskDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 to compare only the date part
  
      if (taskDate.getTime() === today.getTime()) {
        return { ...task, category: 'today' };
      } else if (taskDate > today) {
        return { ...task, category: 'upcoming' };
      } else if (taskDate < today) {
        return { ...task, category: 'recent' }; // Assign all tasks with end dates before today to the 'assigned' category
      }
    });
  
    setTasks(updatedTasks);
  }, []);
  
  const toggleRecent = () => setShowRecent(!showRecent);
  const toggleToday = () => setShowToday(!showToday);
  const toggleUpcoming = () => setShowUpcoming(!showUpcoming);

  const allTasks = tasks.map((task) => ({
    ...task,
    id: task.id, // Include the id field
    status: task.category === 'recent' ? 'Recently Assigned' : task.category === 'today' ? 'Today' : 'Upcoming',
  }));

  const columns = [
    { field: 'name', headerName: 'Task Name', width: 250 },
    { field: 'date', headerName: 'Due Date', width: 250 },
    { field: 'project', headerName: 'Project', width: 250 },
  ];

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
  };

  const handleCloseModal = () => {
    setSelectedRowData(null);
  };

  const calculateProgress = (checkedArray) => {
    const completedCount = checkedArray.filter(item => item).length;
    const totalCount = checkedArray.length;
    const progress = (completedCount / totalCount) * 100;
    setTaskProgress(progress);
  };
  
  const handleTaskClick = (task) => {
    setSelectedRowData(task);
    if (task.subtasks) {
      setSubtaskChecked(Array(task.subtasks.length).fill(false));
      calculateProgress(Array(task.subtasks.length).fill(false));
    }
  };

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

  const handleCheckboxChange = (index) => {
    const updatedChecked = [...subtaskChecked];
    updatedChecked[index] = !updatedChecked[index];
    setSubtaskChecked(updatedChecked);
    calculateProgress(updatedChecked); // Call calculateProgress function with updated array
  };
  

  const handleCheckboxClick = (event, row) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    swal({
      title: "Task Completed?",
      text: "Do you want to remove it from the list?",
      // icon: "info",
      buttons: ["Cancel", "Remove"],
    }).then((willRemove) => {
      if (willRemove) {
        // Remove the task from the list
        const updatedTasks = tasks.filter(task => task.id !== row.id);
        setTasks(updatedTasks);
        swal("Task Removed!", {
          icon: "success",
        });
      } else {
        // If the user cancels, uncheck the checkbox
        const updatedTasks = tasks.map(task => {
          if (task.id === row.id) {
            return { ...task, completed: false };
          }
          return task;
        });
        setTasks(updatedTasks);
      }
    });
  };
  
  const handleMarkAsCompleted = () => {
    swal({
      title: "Task Completed?",
      text: "Do you want to remove it from the list?",
      // icon: "info",
      buttons: ["Cancel", "Remove"],
    }).then((willRemove) => {
      if (willRemove) {
        // Remove the task from the list
        const updatedTasks = tasks.filter(task => task.id !== selectedRowData.id);
        setTasks(updatedTasks);
        swal("Task Completed!", {
          icon: "success",
        });
        handleCloseModal();
      }
    });
  };

  return (
    <Box>
      <div style={{ maxWidth: '100%', margin: 'auto', paddingTop: '20px' }}>
        <DataGrid
          rows={[]}
          columns={columns}
          hideFooter
          localeText={{ noRowsLabel: '' }}
          sx={{
            border: 'none',
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: 'none',
            },
          }}
          onRowClick={(params) => handleRowClick(params.row)}
        />
        <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
          <h6 style={{ marginBottom: '10px', marginTop: '10px', cursor: 'pointer' }} onClick={toggleRecent}>
            <FaAngleDown style={{ marginLeft: '3px', verticalAlign: 'middle' }} />
             Assigned
          </h6>
          {showRecent && (
            <DataGrid
              rows={allTasks.filter((task) => task.category === 'recent').map(task => ({ ...task, id: task.id }))}
              columns={columns}
              checkboxSelection  // Enable checkbox selection
              hideFooterPagination
              hideFooter
              getRowClassName={() => 'no-background'}
              onRowClick={(params) => handleRowClick(params.row)}
              onSelectionModelChange={(params) => console.log(params)}
              sx={{
                border: 'none',
                "& .MuiDataGrid-cell": {
                  borderBottom: '0.5px solid #ccc',
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  display: 'none',
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: 'none',
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
              }}
              onCellClick={(params) => {
                if (params.field === '__check__') {
                  handleCheckboxClick(params.event, params.row);
                }
              }}
            />
          )}
        </div>
        <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
          <h6 style={{ marginBottom: '10px', cursor: 'pointer', paddingBottom: '5px', marginLeft: '2px' }} onClick={toggleToday}>
            <FaAngleDown style={{ marginLeft: '3px', verticalAlign: 'middle' }} />
            Today
          </h6>
          {showToday && (
            <DataGrid
              rows={allTasks.filter((task) => task.category === 'today')}
              columns={columns}
              checkboxSelection
              hideFooterPagination
              hideFooter
              getRowClassName={() => 'no-background'}
              onRowClick={(params) => handleRowClick(params.row)}
              sx={{
                border: 'none',
                "& .MuiDataGrid-cell": {
                  borderBottom: '0.5px solid #ccc',
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  display: 'none',
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: 'none',
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .no-background .MuiDataGrid-viewport": {
                  backgroundColor: 'transparent !important',
                },
              }}
              onCellClick={(params) => {
                if (params.field === '__check__') {
                  handleCheckboxClick(params.event, params.row);
                }
              }}
            />
          )}
        </div>
        <div style={{ borderBottom: '1px solid #ccc' }}>
          <h6 style={{ marginBottom: '10px', cursor: 'pointer', paddingBottom: '5px' }} onClick={toggleUpcoming}>
            <FaAngleDown style={{ marginLeft: '3px', verticalAlign: 'middle' }} />
            Upcoming
          </h6>
          {showUpcoming && (
            <DataGrid
              rows={allTasks.filter((task) => task.category === 'upcoming')}
              columns={columns}
              checkboxSelection
              hideFooterPagination
              hideFooter
              onRowClick={(params) => handleRowClick(params.row)}
              sx={{
                border: 'none',
                "& .MuiDataGrid-cell": {
                  borderBottom: '0.5px solid #ccc',
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  display: 'none',
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
              }}
              onCellClick={(params) => {
                if (params.field === '__check__') {
                  handleCheckboxClick(params.event, params.row);
                }
              }}
            />
          )}
        </div>
      </div>
      <Modal open={selectedRowData !== null} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: colors.primary[400],
            borderRadius: '20px',
            boxShadow: 24,
            p: 4,
            maxWidth: 600,
            height: '80%',
            width: '100%',
            outline: 'none',
            overflow: 'auto',
          }}
        >
          <Typography variant="h2" sx={{ color: colors.primary[110], paddingBottom: '15px' }} gutterBottom>
            Task Details
          </Typography>
          {selectedRowData && (
            <>
              <Typography variant="subtitle1" gutterBottom sx={{ paddingBottom: '10px' }}>
                <Typography variant="h5" component="span" sx={{ color: colors.greenAccent[400] }}>Task Name: </Typography>{selectedRowData.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom sx={{ paddingBottom: '10px' }}>
                <AccessTimeIcon color="secondary" />
                <Typography variant="body1" component="span" sx={{ color: colors.greenAccent[400], paddingLeft: '10px' }}>{calculateDueDate(selectedRowData.startDate, selectedRowData.endDate)}</Typography>
              </Typography>
              <Typography variant="subtitle1" gutterBottom sx={{ paddingBottom: '10px' }}>
                <Typography variant="h5" sx={{ color: colors.greenAccent[400] }}> Description:</Typography> {selectedRowData.description}
              </Typography>
              {selectedRowData.subtasks && selectedRowData.subtasks.length > 0 && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    <Typography variant="h5" component="span" sx={{ color: colors.greenAccent[400], paddingBottom: '10px' }}>
                      Subtasks:
                    </Typography>
                  </Typography>
                  {selectedRowData.subtasks.map((subtask, index) => (
                    <Box key={index} display="flex" alignItems="center" gutterBottom>
                      <Checkbox color="secondary" checked={subtaskChecked[index]} onChange={() => handleCheckboxChange(index)} />
                      <Typography variant="body2" gutterBottom style={{ color: subtaskChecked[index] ? 'grey' : 'inherit' }}>
                        {subtask.name}
                      </Typography>
                    </Box>
                  ))}
                  <Typography variant="body2" gutterBottom style={{ color: colors.greenAccent[400], paddingTop: '15px' }}>
                    Progress: {taskProgress.toFixed(0)}%
                  </Typography>
                </>
              )}
               {!selectedRowData.subtasks && (
                <Box sx={{ width: '95%' }}>
                  <Typography id="progress-slider" variant="h5" sx={{ color: colors.greenAccent[400], paddingTop: '20px' }} gutterBottom>
                    Progress:
                  </Typography>
                  <Slider
                    aria-labelledby="progress-slider"
                    valueLabelDisplay="auto"
                    // value={50} // Set your progress value here
                    sx={{ color: colors.primary[110] }}
                  />
                </Box>
              )}
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                onClick={handleMarkAsCompleted}
                sx={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                }}
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