import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  useTheme,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Grid,
  } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import * as yup from "yup"; // Import yup for validation
import { tokens } from "../../../theme";
import { useSelector } from "react-redux";
import Header from "../../../components/Header";

const MAX_DESCRIPTION_LENGTH = 100;

const truncateDescription = (description) => {
  if (description.length <= MAX_DESCRIPTION_LENGTH) {
    return description;
  }
  return `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
};

const schema = yup.object().shape({
  milestoneName: yup.string().required("Milestone Name is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
  priority: yup.string().required("Priority is required"),
  budget: yup
    .number()
    .positive("Budget must be a positive number")
    .required("Budget is required"),
  // resources: yup
  //   .array()
  //   .of(yup.string())
  //   .min(1, "At least one resource is required")
  //   .required("Resource is required"),
  quantity: yup
    .number()
    .positive("Quantity must be a positive number")
    .required("Quantity is required"),
});

const Milestone = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const project = useSelector((state) => state.project.project);
  console.log(project);

  const [milestoneName, setMilestoneName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [budget, setBudget] = useState(0);
  const [resources, setResources] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [projectResources, setProjectResources] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedMilestones, setSubmittedMilestones] = useState([]);
  const [errors, setErrors] = useState({}); // State variable to hold validation errors

  useEffect(() => {
    if (project && project.Resources) {
      const resources = Object.keys(project.Resources);
      console.log(resources);
      setProjectResources(resources);
    }
  }, [project]);

  const handleMilestoneNameChange = (e) => {
    setMilestoneName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };
  const handleResourceChange = (e) => {
    setResources([...resources, e.target.value]);
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data
      await schema.validate(
        {
          milestoneName,
          description,
          status,
          priority,
          budget,
          resources,
          quantity,
        },
        { abortEarly: false }
      );

      // const handleCancel = () => {
      // setMilestoneName("");
      // setDescription("");
      // setStatus("");
      // setPriority("");
      // setBudget(0);
      // setResources([]);
      // setQuantity(0);
      // setIsFormOpen(false);
      // };

      // Create a new Milestone object
      const newMilestone = {
        milestoneName,
        description,
        status,
        priority,
        budget,
        resources,
        quantity,
      };

      // Update the submitted milestones list
      setSubmittedMilestones((prevMilestones) => [
        ...prevMilestones,
        newMilestone,
      ]);

      // Clear the form fields
      setMilestoneName("");
      setDescription("");
      setStatus("");
      setPriority("");
      setBudget(0);
      setResources([]);
      setQuantity(0);

      setIsFormOpen(false); // Close the form after submission
    } catch (error) {
      // Handle validation errors
      console.error("Validation Error:", error.errors);
      // Update error state to display error messages
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  const handleEditMilestone = (index) => {
    // Retrieve the milestone at the specified index
    const milestone = submittedMilestones[index];

    // Set the form fields with the values from the selected milestone
    setMilestoneName(milestone.milestoneName);
    setDescription(milestone.description);
    setStatus(milestone.status);
    setPriority(milestone.priority);
    setBudget(milestone.budget);
    setResources(milestone.resources);
    setQuantity(milestone.quantity);

    // Remove the selected milestones from the submitted milestoness list
    setSubmittedMilestones((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      updatedMilestones.splice(index, 1);
      return updatedMilestones;
    });

    // Open the form for editing the milestones
    setIsFormOpen(true);
  };

  const handleDeleteMilestone = (index) => {
    setSubmittedMilestones((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      updatedMilestones.splice(index, 1);
      return updatedMilestones;
    });
  };

  const handleCancel = () => {
    setMilestoneName("");
    setDescription("");
    setStatus("");
    setPriority("");
    setBudget(0);
    setResources([]);
    setQuantity(0);
    setIsFormOpen(false);
    setErrors({}); // Reset errors to clear any validation errors
  };

  return (
    <Box m="20px">
       <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
      <Header title="Milestone" subtitle="Manages the milestones we have" />
     
        <Button
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: colors.primary[400],
            color: theme.palette.common.white,
            fontSize: "12px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={() => setIsFormOpen(true)}
        >
          Add Milestone
        </Button>
      </Box>

      {isFormOpen && (
        <Modal open={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxWidth: 700,
              width: "100%",
              outline: "none",
              height: '80%',
              overflow: 'auto',
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Add Milestone
            </Typography>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="milestoneName"
                  label="Milestone Name"
                  variant="outlined"
                  fullWidth
                  value={milestoneName}
                  onChange={handleMilestoneNameChange}
                  error={!!errors.milestoneName} // Set error prop based on whether there's an error for this field
                  helperText={errors.milestoneName} // Display error message for this field
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor:'#868dfb',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      '&.Mui-focused': {
                        color:'#868dfb',
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  id="milestoneDescription"
                  label="Milestone Description"
                  variant="outlined"
                  multiline
                  rows={4.5}
                  fullWidth
                  value={description}
                  onChange={handleDescriptionChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor:'#868dfb',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      '&.Mui-focused': {
                        color:'#868dfb',
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="status"
                  select
                  label="Status"
                  variant="outlined"
                  fullWidth
                  value={status}
                  onChange={handleStatusChange}
                  error={!!errors.status}
                  helperText={errors.status}
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor:'#868dfb',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      '&.Mui-focused': {
                        color:'#868dfb',
                      },
                    },
                  }}
                >
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
              </Box>
             </Grid>
             <Grid item xs={6}>

              <Box sx={{ mb: 2 }}>
                <TextField
                  id="priority"
                  select
                  label="Priority"
                  variant="outlined"
                  fullWidth
                  value={priority}
                  onChange={handlePriorityChange}
                  error={!!errors.priority}
                  helperText={errors.priority}
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor:'#868dfb',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      '&.Mui-focused': {
                        color:'#868dfb',
                      },
                    },
                  }}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="allocatedBudget"
                  label="Allocated Budget"
                  variant="outlined"
                  fullWidth
                  value={budget}
                  onChange={handleBudgetChange}
                  error={!!errors.budget}
                  helperText={errors.budget}
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor:'#868dfb',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      '&.Mui-focused': {
                        color:'#868dfb',
                      },
                    },
                  }}
                  
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="resource"
                  select
                  label="Resource"
                  variant="outlined"
                  fullWidth
                  value={resources}
                  onChange={handleResourceChange}
                  // error={!!errors.resources}
                  // helperText={errors.resources}
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor:'#868dfb',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      '&.Mui-focused': {
                        color:'#868dfb',
                      },
                    },
                  }}
                >
                  {projectResources.map((resource) => (
                    <MenuItem key={resource} value={resource}>
                      {resource}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="resourceQuantity"
                  label="Resource Quantity"
                  variant="outlined"
                  fullWidth
                  value={quantity}
                  onChange={handleQuantityChange}
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor:'#868dfb',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      '&.Mui-focused': {
                        color:'#868dfb',
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
      )}

      {submittedMilestones.length > 0 && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap="20px"
          mt="10px"
          alignItems="start"
        >
          {submittedMilestones.map((milestone, index) => (
            <Accordion
              key={index}
              style={{ backgroundColor: "#1F2A40", width: "100%" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  Milestone Name:{" "}
                  <Typography
                    variant="h4"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    {milestone.milestoneName}
                  </Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  flexDirection: "column",
                  position: "relative",
                  marginBottom: "5px",
                  alignItems: "start",
                  textAlign: "left",
                }}
              >
                <Typography variant="body1" gutterBottom>
                  Description:
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
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
                      {truncateDescription(milestone.description)}
                  </Typography>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status:{" "}
                  <Typography variant="body1" component="span">
                    {milestone.status}
                  </Typography>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Priority:{" "}
                  <Button
                    size="small"
                    sx={{
                      padding: "6px 6px",
                      height: "24px",
                      width: "24px",
                    }}
                    variant="contained"
                    color={
                      milestone.priority === "High"
                        ? "error"
                        : milestone.priority === "Medium"
                        ? "warning"
                        : "success"
                    }
                  >
                    {milestone.priority}
                  </Button>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Allocated Budget:{" "}
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    {milestone.budget}
                  </Typography>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Resource required:{" "}
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    {milestone.resources}
                  </Typography>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Quantity of resource:{" "}
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    {milestone.quantity}
                  </Typography>
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-end"
                  mt={2}
                >
                  <Box alignItems={"flex-end"}>
                    <IconButton
                      color="secondary"
                      onClick={() => handleEditMilestone(index)}
                      style={{
                        position: "absolute",
                        bottom: "3px",
                        right: "8px",
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteMilestone(index)}
                      style={{
                        position: "absolute",
                        bottom: "3px",
                        right: "38px",
                        paddingTop: "10px",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Milestone;
