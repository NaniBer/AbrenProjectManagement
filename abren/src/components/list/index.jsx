import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
  Avatar,
  Tooltip,
  Grid,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import the expand icon
import Header from '../Header';
import { tokens } from '../../theme';
import { mockDataTeam } from '../../data/mockData';
import { Card, CardContent } from '@mui/material';
import * as Yup from 'yup';

const MAX_DESCRIPTION_LENGTH = 100;
const MAX_SUBTASK_LENGTH = 100;

const validationSchema = Yup.object().shape({
  taskList: Yup.string().required('Task List is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date()
    .required('End Date is required')
    .min(Yup.ref('startDate'), 'End Date must be after Start Date'),
  description: Yup.string().required('Description is required'),
  teamMembers: Yup.array()
    .required('Team Members are required')
    .min(1, 'Please select at least one team member'),
});


const truncateDescription = (description) => {
  if (description.length <= MAX_DESCRIPTION_LENGTH) {
    return description;
  }
  return `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
};

const truncateSubtask = (subtask) => {
  if (subtask.length <= MAX_SUBTASK_LENGTH) {
    return subtask;
  }
  return `${subtask.substring(0, MAX_SUBTASK_LENGTH)}...`;
};
const Resource = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [taskList, setTaskList] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedResources, setSubmittedResources] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [subtasks, setSubtasks] = useState(['']);
  const [expandedCardIndex, setExpandedCardIndex] = useState(-1); // Initialize with -1 to indicate no card is expanded


  const handleTaskListChange = (e) => {
    setTaskList(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubtaskChange = (index, e) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = e.target.value;
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const handleCancel = () => {
    setTaskList('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setSelectedTeamMembers([]);
    setValidationErrors({});
    setIsFormOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(
        {
          taskList,
          startDate,
          endDate,
          description,
          teamMembers: selectedTeamMembers,
        },
        { abortEarly: false }
      );

      const newResource = {
        taskList,
        startDate,
        endDate,
        description,
        teamMembers: selectedTeamMembers,
        subtasks,
      };

      setSubmittedResources((prevResources) => [...prevResources, newResource]);

      setTaskList('');
      setStartDate('');
      setEndDate('');
      setDescription('');
      setSelectedTeamMembers([]);
      setSubtasks(['']);
      setValidationErrors({}); // Reset validation errors
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
      // Handle validation errors here
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setValidationErrors(errors);
    }
  };

  const handleEditResource = (index) => {
    const resource = submittedResources[index];

    setTaskList(resource.taskList);
    setStartDate(resource.startDate);
    setEndDate(resource.endDate);
    setDescription(resource.description);
    setSelectedTeamMembers(resource.teamMembers);
    setSubtasks(resource.subtasks);

    setSubmittedResources((prevResources) => {
      const updatedResources = [...prevResources];
      updatedResources.splice(index, 1);
      return updatedResources;
    });

    setIsFormOpen(true);
  };

  const handleDeleteResource = (index) => {
    setSubmittedResources((prevResources) => {
      const updatedResources = [...prevResources];
      updatedResources.splice(index, 1);
      return updatedResources;
    });
  };
  const handleExpandCard = (index) => {
    setExpandedCardIndex(index === expandedCardIndex ? -1 : index);
  };
  return (
    <Box m="20px">
      <Header title="Task List" subtitle="Manages the List of Tasks" />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          startIcon={<AddIcon />}
          sx={{
            color: theme.palette.common.white,
            backgroundColor: colors.primary[400],
            fontSize: '12px',
            fontWeight: 'bold',
            padding: '10px 20px',
            justifyContent: 'end',
          }}
          onClick={() => setIsFormOpen(true)}
        >
          Add Task
        </Button>
      </Box>

      <Modal open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxWidth: 800,
            height: '80%',
            width: '100%',
            outline: 'none',
            overflow: 'auto',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Add Task
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="taskList"
                    label="Task Name"
                    variant="outlined"
                    fullWidth
                    value={taskList}
                    onChange={handleTaskListChange}
                    error={!!validationErrors.taskList}
                    helperText={validationErrors.taskList}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: validationErrors.taskList ? 'red' : '#868dfb',
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        '&.Mui-focused': {
                          color: validationErrors.taskList ? 'red' : '#868dfb',
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="startDate"
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={startDate}
                    onChange={handleStartDateChange}
                    error={!!validationErrors.startDate}
                    helperText={validationErrors.startDate}
                    sx={{
                      '& .MuiIconButton-root': {
                        color: '#868dfb', // Change the color of the icon
                      },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: validationErrors.startDate ? 'red' : '#868dfb',
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        '&.Mui-focused': {
                          color: validationErrors.startDate ? 'red' : '#868dfb',
                        },
                      },
                    }}
                    
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    fullWidth
                    value={description}
                    onChange={handleDescriptionChange}
                    error={!!validationErrors.description}
                    helperText={validationErrors.description}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: validationErrors.description ? 'red' : '#868dfb',
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        '&.Mui-focused': {
                          color: validationErrors.description ? 'red' : '#868dfb',
                        },
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
              <Box sx={{ mb: 2 }}>
                  <Autocomplete
                    multiple
                    id="teamMembers"
                    options={mockDataTeam}
                    getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                    value={selectedTeamMembers}
                    onChange={(event, value) => setSelectedTeamMembers(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Team Members"
                        fullWidth
                        error={!!validationErrors.teamMembers}
                        helperText={validationErrors.teamMembers}
                      />
                    )}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: validationErrors.teamMembers ? 'red' : '#868dfb',
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        '&.Mui-focused': {
                          color: validationErrors.teamMembers ? 'red' : '#868dfb',
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="endDate"
                    label="End Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={endDate}
                    onChange={handleEndDateChange}
                    error={!!validationErrors.endDate}
                    helperText={validationErrors.endDate}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: validationErrors.endDate ? 'red' : '#868dfb',
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        '&.Mui-focused': {
                          color: validationErrors.endDate ? 'red' : '#868dfb',
                        },
                      },
                    }}
                  />
                </Box>

               

               

               

                
              </Grid>
              <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Subtasks
                  </Typography>
                  <Grid container spacing={2}>
                    {subtasks.map((subtask, index) => (
                      <Grid item xs={12} key={index}>
                        <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                          <TextField
                            label={`Subtask ${index + 1}`}
                            variant="outlined"
                            fullWidth
                            value={subtask}
                            onChange={(e) => handleSubtaskChange(index, e)}
                          />
                          <Button onClick={() => handleRemoveSubtask(index)}>
                            <DeleteIcon />
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                    
                  </Grid>
                  <Button onClick={handleAddSubtask} color= "secondary" startIcon={<AddIcon />}>
                    Add Subtask
                  </Button>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Grid container spacing={2}>
        {submittedResources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ marginTop: '20px', backgroundColor: colors.primary[400], borderRadius: '15px' }}>
              <CardContent sx={{ textAlign: 'left' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3" color={colors.primary[110]}>
                  {resource.taskList}
                </Typography>
                {/* Expand button */}
                <Button onClick={() => handleExpandCard(index)} color="secondary">
                  <ExpandMoreIcon />
                </Button>
              </Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Start Date:{' '}
                  <Typography variant="body1" component="span" color={colors.greenAccent[400]}>
                    {resource.startDate}
                  </Typography>
                </Typography>
                <Typography variant="body1">
                  End Date:{' '}
                  <Typography variant="body1" component="span" color={colors.greenAccent[400]}>
                    {resource.endDate}
                  </Typography>
                </Typography>

                <Tooltip title={resource.description} arrow>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 1,
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                      maxHeight: '4.5em',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    Description:{' '}
                    <Typography variant="body1" component="span" color={colors.greenAccent[400]}>
                      {truncateDescription(resource.description)}
                    </Typography>
                  </Typography>
                </Tooltip>

                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="body1" sx={{ mr: 1, marginTop: 2 }}>
                    Team Members:
                  </Typography>
                  {resource.teamMembers.map((member) => (
                    <Tooltip key={member.id} title={member.email} placement="top">
                      <Avatar key={member.id} sx={{ bgcolor: colors.primary[110], height: '30px', width: '30px', mr: 1 }}>
                        {`${member.firstname.charAt(0)}${member.lastname.charAt(0)}`}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Box>
                
               {/* Display subtasks only if this card is expanded */}
                {expandedCardIndex === index && (
                  <>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>Subtasks:</Typography>
                {resource.subtasks.map((subtask, subtaskIndex) => (
               <Tooltip title={subtask} arrow>
               <Typography key={subtaskIndex} variant="body1" sx={{mb:3}}>
                 {`- ${truncateSubtask(subtask)}`} {/* Use truncateSubtask function here */}
               </Typography>
             </Tooltip>
                    ))}
                  </>
                )}

                <Box display="flex" justifyContent="flex-end" mt={5}>
                  <Button color="secondary" width="2px" height="2px" startIcon={<EditIcon />} onClick={() => handleEditResource(index)} sx={{ mr: -3 }}>
                    {/* Edit */}
                  </Button>
                  <Button color="secondary" width="5px" height="5px" startIcon={<DeleteIcon />} onClick={() => handleDeleteResource(index)}>
                    {/* Delete */}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Resource;
