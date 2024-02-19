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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    const resources = Object.keys(project.Resources);
    console.log(resources);
    setProjectResources(resources);
  }, []);
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
  const handleSubmit = (e) => {
    e.preventDefault();

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

    // Update the submitted miletsones list
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
    setResources("");
    setQuantity(0);

    setIsFormOpen(false); // Close the form after submission
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

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h2">
          MILESTONES
        </Typography>

        <Button
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={() => setIsFormOpen(true)}
        >
          Add Miletsone
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
              maxWidth: 500,
              width: "100%",
              outline: "none",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Add Miletsone
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="milestoneName"
                  label="Milestone Name"
                  variant="outlined"
                  fullWidth
                  value={milestoneName}
                  onChange={handleMilestoneNameChange}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: "#868dfb",
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
                  fullWidth
                  value={description}
                  onChange={handleDescriptionChange}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: "#868dfb",
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
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: "#868dfb",
                      },
                    },
                  }}
                >
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  id="priority"
                  select
                  label="Priority"
                  variant="outlined"
                  fullWidth
                  value={priority}
                  onChange={handlePriorityChange}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: "#868dfb",
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
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: "#868dfb",
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="resource"
                  select
                  label="Status"
                  variant="outlined"
                  fullWidth
                  value={resources}
                  onChange={handleResourceChange}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: "#868dfb",
                      },
                    },
                  }}
                >
                  {projectResources.map((resource) => (
                    <MenuItem value={resource}>{resource}</MenuItem>
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
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: "#868dfb",
                      },
                    },
                  }}
                />
              </Box>

              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      )}

      {submittedMilestones.length > 0 && (
        <Box mt={4}>
          {/* <Typography variant="h5" component="h3" mb={2}>
            Submitted milestoness
          </Typography> */}
          {submittedMilestones.map((milestone, index) => (
            <Accordion style={{ backgroundColor: "#1F2A40" }} key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">
                  Milestone Name:{" "}
                  <Typography
                    variant="h4"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    {" "}
                    {milestone.milestoneName}
                  </Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" gutterBottom>
                  Description:
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    {" "}
                    {milestone.description}
                  </Typography>
                </Typography>
                <Box display="flex" flexDirection="column" width="100%">
                  <Typography variant="body1" gutterBottom>
                    Status:{" "}
                    <Typography
                      variant="body1"
                      component="span"
                      color={colors.greenAccent[400]}
                    >
                      {" "}
                      {milestone.status}
                    </Typography>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Priority:{" "}
                    <Typography
                      variant="body1"
                      component="span"
                      color={colors.greenAccent[400]}
                    >
                      {" "}
                      {milestone.priority}
                    </Typography>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Allocated Budget:{" "}
                    <Typography
                      variant="body1"
                      component="span"
                      color={colors.greenAccent[400]}
                    >
                      {" "}
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
                      {" "}
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
                      {" "}
                      {milestone.quantity}
                    </Typography>
                  </Typography>

                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <IconButton
                      color="secondary"
                      onClick={() => handleEditMilestone(index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteMilestone(index)}
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
