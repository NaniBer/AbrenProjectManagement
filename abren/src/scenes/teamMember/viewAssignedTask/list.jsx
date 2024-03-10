import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FaAngleDown } from 'react-icons/fa';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import { tokens } from '../../../theme';
import { Box, Button, useTheme, Modal, Typography, Checkbox } from '@mui/material';
import swal from 'sweetalert';

function TaskList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dummyTaskData = {
    name: 'Task 1',
    startDate: '2024-03-09',
    endDate: '2024-03-12',
    project: 'Project X',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id turpis at urna tincidunt sodales sed id turpis. Mauris non leo a metus tempus gravida.',
    subtasks: ['Subtask 1', 'Subtask 2', 'Subtask 3'],
  };

  const [showRecent, setShowRecent] = useState(false);
  const [showToday, setShowToday] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [subtaskChecked, setSubtaskChecked] = useState(Array(dummyTaskData.subtasks?.length ?? 0).fill(false));

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
          <Typography variant="h5" component="span" sx={{ color: colors.greenAccent[400] }}>Task Name: </Typography>{dummyTaskData.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ paddingBottom: '10px' }}>
          <AccessTimeIcon color="secondary" />
          <Typography variant="body1" component="span" sx={{ color: colors.greenAccent[400], paddingLeft: '10px' }}>{calculateDueDate(dummyTaskData.startDate, dummyTaskData.endDate)}</Typography>
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ paddingBottom: '10px' }}>
          <Typography variant="h5" sx={{ color: colors.greenAccent[400] }}> Description:</Typography> {dummyTaskData.description}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ paddingBottom: '10px' }}>
          <Typography variant="h5" component="span" sx={{ color: colors.greenAccent[400] }}>Subtasks:</Typography>
        </Typography>
        {dummyTaskData.subtasks && dummyTaskData.subtasks.map((subtask, index) => (
          <Box key={index} display="flex" alignItems="center" gutterBottom sx={{ paddingBottom: '10px' }}>
            <Checkbox color="secondary" checked={subtaskChecked[index]} onChange={() => handleCheckboxChange(index)} />
            <Typography variant="body2" gutterBottom style={{ color: subtaskChecked[index] ? 'grey' : 'inherit' }}>
              {subtask}
            </Typography>
          </Box>
        ))}
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
