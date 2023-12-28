import React, { useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import {
  Box,
  Button,
  useTheme,
  Modal,
  TextField,
  Typography

} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { tokens } from "../../theme";

const Project = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [projectName, setprojectName] = useState('');
  const [description, setDescription] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedProjects, setSubmittedProjects] = useState([]);

  const handleprojectNameChange = (e) => {
    setprojectName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new Project object
    const newProject = {
      projectName,
      description
    };

    // Update the submitted Projects list
    setSubmittedProjects((prevProjects) => [...prevProjects, newProject]);

    // Clear the form fields
    setprojectName('');
    setDescription('');
   

    setIsFormOpen(false); // Close the form after submission
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component="h2" >
          Create Project
        </Typography>

        <Button
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
            border:"dotted"
          }}
          onClick={() => setIsFormOpen(true)}
        >
          Add Project
        </Button>
      </Box>

      {isFormOpen && (
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
              maxWidth: 500,
              width: '100%',
              outline: 'none',
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Add Project
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="projectName"
                  label="Project Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={projectName}
                  onChange={handleprojectNameChange}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  fullWidth
                  rows={4}
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Box>


              

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      )}

<Box display="flex">
      <Box mt={4}>
        {submittedProjects.map((Project, index) => (
          <Box
            key={index}
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: '4px',
              p: 2,
              mb: 2,
            }}
          >

<List sx={{ maxWidth: 400 }}>
  <ListItem disablePadding sx={{ marginBottom: '16px' }}>
    <ListItemText
      primary={
        <Typography variant="h3" color={colors.greenAccent[400]}>
          <Typography 
          color={colors.grey[400]}
          variant='h2'
          >.</Typography>
          {Project.projectName}
        </Typography>
      }
      secondary={
        <Typography variant="h6" color={colors.grey[400]}>
          {Project.description}
        </Typography>
      }
    />
  </ListItem>
</List>
           
          </Box>
        ))}
      </Box>
      </Box>
    </Box>
  );
};

export default Project;