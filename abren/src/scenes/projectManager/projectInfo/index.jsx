import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
  Card,
  CardContent,
  Avatar,
  Grid,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { mockDataProject } from '../../../data/mockData';
import * as Yup from 'yup';
import { tokens } from '../../../theme';
import Header from '../../../components/Header';



const MAX_BUDGET_LENGTH = 10; // Assuming a maximum of 10 characters for the budget
const validationSchema = Yup.object().shape({
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date()
    .required('End Date is required')
    .min(Yup.ref('startDate'), 'End Date must be after Start Date'),
   budget: Yup
    .number()
    .positive("Budget must be a positive number")
    .required("Budget is required"),
});

const Project = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedProjects, setSubmittedProjects] = useState([...mockDataProject]);
  const [validationErrors, setValidationErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleCancel = () => {
    setStartDate('');
    setEndDate('');
    setBudget('');
    setValidationErrors({});
    setIsFormOpen(false);
    setEditingIndex(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(
        {
          startDate,
          endDate,
          budget,
        },
        { abortEarly: false }
      );

      const newProject = {
        ...submittedProjects[editingIndex],
        startDate,
        endDate,
        budget,
      };

      const updatedProjects = [...submittedProjects];
      updatedProjects[editingIndex] = newProject;
      setSubmittedProjects(updatedProjects);

      // Reset form fields and state
      setStartDate('');
      setEndDate('');
      setBudget('');
      setValidationErrors({});
      setIsFormOpen(false);
      setEditingIndex(-1);
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

  const handleEditProject = (index) => {
    const project = submittedProjects[index];
    // Populate form fields with project data
    setStartDate(project.startDate || '');
    setEndDate(project.endDate || '');
    setBudget(project.budget || '');
    // Set the index of the project being edited
    setEditingIndex(index);
    setIsFormOpen(true); // Open the modal for editing
  };

  return (
    <Box m="20px">
     <Header title="Project Info" subtitle="More information about projects" />

      <Modal open={isFormOpen} onClose={handleCancel}>
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
            height: '70%',
            width: '100%',
            outline: 'none',
            overflow: 'auto',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            {editingIndex !== -1 ? 'Update Project' : 'Add Project'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="projectName"
                    label="Project Name"
                    variant="outlined"
                    fullWidth
                    value={submittedProjects[editingIndex]?.projectname || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor:'#868dfb',
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
                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={submittedProjects[editingIndex]?.description || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor:'#868dfb',
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
                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="projectManager"
                    label="Project Manager"
                    variant="outlined"
                    fullWidth
                    value={submittedProjects[editingIndex]?.projectmanager || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor:'#868dfb',
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
              <Grid item xs={6}>
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
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor:'#868dfb',
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
                          borderColor:'#868dfb',
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
                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="budget"
                    label="Budget"
                    variant="outlined"
                    placeholder='0 ETB'
                    fullWidth
                    value={budget}
                    onChange={handleBudgetChange}
                    error={!!validationErrors.budget}
                    helperText={validationErrors.budget}
                    sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor:'#868dfb',
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

                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<AddIcon />}
                  >
                    {editingIndex !== -1 ? 'Save' : 'Add'}
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
        {submittedProjects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ marginTop: '20px',backgroundColor: colors.primary[400], borderRadius: '15px' }}>
              <CardContent sx={{ textAlign: 'left' }}>
                <Typography variant="h4" sx={{ mb: 1 }} color={colors.primary[110]}>
                  {project.projectname}
                </Typography>
                <Typography variant="body1" sx={{mt:4, mb: 1 }}>
                  <Typography component="span" color={colors.greenAccent[400]} >  Description:  </Typography> {project.description}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>


                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}>
                    Project Manager:
                </Typography>
                <Tooltip title={project.projectmanager} arrow>
                    <Avatar
                    sx={{
                        bgcolor: colors.primary[110],
                        height: '30px',
                        width: '30px',
                        mr: 1,
                        cursor: 'pointer', // Add cursor pointer for indicating tooltip
                    }}
                    >
                    {project.projectmanager.charAt(0)}
                    </Avatar>
                </Tooltip>
                </Box>


                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}>Start Date: </Typography>{project.startDate}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}> End Date: </Typography> {project.endDate}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}> Budget: </Typography>{project.budget}
                </Typography>
                <Box display="flex" justifyContent="flex-end">
                  <Button color="secondary" onClick={() => handleEditProject(index)}>
                    ADD
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

export default Project;