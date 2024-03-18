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
import swal from "sweetalert";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import * as yup from "yup"; // Import yup for validation
import { tokens } from "../../../theme";
import { useSelector, useDispatch } from "react-redux";
import {
  addMilestone,
  editMilestone,
  deleteMilestone,
} from "../../../Actions/projectActions";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";

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
  const milestones = useSelector((state) => state.project.project.milestones);
  const tasks = useSelector((state) => state.project.project.tasks);

  const dispatch = useDispatch();
  const [MilestoneName, setMilestoneName] = useState("");
  const [MilestoneDescription, setMilestoneDescription] = useState("");
  const [Status, setStatus] = useState("");
  const [Priority, setPriority] = useState("");
  const [AllocatedBudget, setAllocatedBudget] = useState(0);
  const [resources, setResources] = useState([]);
  const [ResourceQuantity, setResourceQuantity] = useState(0);
  const [edit, setEdit] = useState(false);
  const [editedMilestone, seteditedMilestone] = useState();

  const [projectResources, setProjectResources] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedMilestones, setSubmittedMilestones] = useState([]);

  const [errors, setErrors] = useState({}); // State variable to hold validation errors
  const [milestoneTasks, setMilestoneTasks] = useState({});

  useEffect(() => {
    if (project && project.resources) {
      const resources = project.resources;
      // const resourceNames = resources.map((resource) => resource.ResourceName);
      // console.log(resourceNames);
      setProjectResources(resources);
      console.log();
      if (milestones) {
        setSubmittedMilestones(milestones);
      }
    }
  }, [milestones]);
  useEffect(() => {
    // Filter tasks associated with each milestone when milestones change
    if (submittedMilestones.length > 0 && tasks.length > 0) {
      const tasksMap = {};
      console.log(tasks);
      submittedMilestones.forEach((milestone) => {
        const milestoneTasks = tasks.filter(
          (task) => task.milestone === milestone._id
        );
        tasksMap[milestone._id] = milestoneTasks;
      });

      setMilestoneTasks(tasksMap);
    }
  }, [submittedMilestones, tasks]);

  const handleMilestoneNameChange = (e) => {
    setMilestoneName(e.target.value);
  };
  const handleMilestoneDescriptionChange = (e) => {
    setMilestoneDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const handleAllocatedBudgetChange = (e) => {
    setAllocatedBudget(e.target.value);
  };
  const handleResourceChange = (e) => {
    console.log(e.target.value);
    setResources([...resources, e.target.value]);
  };
  const handleResourceQuantityChange = (e) => {
    setResourceQuantity(e.target.value);
  };
  const getResourceIdByName = (resourceName) => {
    const resource = projectResources.find(
      (resource) => projectResources.ResourceName === resourceName
    );
    return resource ? resource._id : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendMilestone = {
      MilestoneName,
      MilestoneDescription,
      ResourceQuantity,
      AllocatedBudget,
      Priority,
      Status,
    };
    backendMilestone.projectId = project._id;
    backendMilestone.ResourceId = resources;
    console.log(backendMilestone);
    const isDuplicate = submittedMilestones.some(
      (milestone) => milestone.MilestoneName === MilestoneName
    );
    if (isDuplicate) {
      // Close loading modal
      swal.close();
      // Show error message for duplicate name
      swal("Error!", "Milestone name already exists", "error");
    } else {
      // Show loading modal
      swal({
        title: "Please wait...",
        text: edit ? "Updating Milestone" : "Adding Milestone",
        buttons: false,
        closeOnEsc: false,
        closeOnClickOutside: false,
        icon: "info",
      });

      if (edit) {
        // Editing an existing Milestone
        const resourceId = getResourceIdByName(backendMilestone.ResourceName);
        console.log(resourceId);
        backendMilestone.ResourceId = resourceId;

        try {
          console.log(backendMilestone);
          const response = await fetch(
            `/Users/updateMilestone/${editedMilestone._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(backendMilestone),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log(data);

          // Clear the form fields
          setMilestoneName("");
          setMilestoneDescription("");
          setResources([]);
          setStatus("");
          setResourceQuantity(0);
          setAllocatedBudget(0);
          setPriority("");
          setIsFormOpen(false);

          // Update submitted resources
          setSubmittedMilestones((prevMilestones) => [
            ...prevMilestones,
            backendMilestone,
          ]);

          dispatch(editMilestone(data.updatedMilestone));

          // Close loading modal
          swal.close();

          // Show success message
          swal("Success!", "Milestone updated successfully", "success");
        } catch (error) {
          console.error("Error updating Milestone:", error);
          // Close loading modal
          swal.close();
        }
      } else {
        // Creating a new Milestone
        try {
          const response = await fetch("/Users/addMilestone", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(backendMilestone),
          });

          if (response.status === 201) {
            const data = await response.json();
            console.log(data.milestone);
            backendMilestone._id = data.milestone._id;

            // Update submitted milestones
            setSubmittedMilestones((prevMilestones) => [
              ...prevMilestones,
              backendMilestone,
            ]);
            dispatch(addMilestone(data.milestone));

            // Clear the form fields
            setMilestoneName("");
            setMilestoneDescription("");
            setStatus("");
            setResources([]);
            setResourceQuantity(0);
            setAllocatedBudget(0);
            setPriority("");
            setIsFormOpen(false);

            // Close loading modal
            swal.close();

            // Show success message
            swal("Success!", "Milestone added successfully", "success");
          } else {
            throw new Error("Failed to create Milestone");
          }
        } catch (error) {
          console.error("Error creating Milestone:", error);
          // Close loading modal
          swal.close();
        }
      }
    }
  };

  const handleEditMilestone = (index) => {
    // Retrieve the milestone at the specified index
    const milestone = submittedMilestones[index];

    // Set the form fields with the values from the selected milestone
    setMilestoneName(milestone.MilestoneName);
    setMilestoneDescription(milestone.MilestoneDescription);
    setStatus(milestone.Status);
    setPriority(milestone.Priority);
    setAllocatedBudget(milestone.AllocatedBudget);

    setResourceQuantity(milestone.ResourceQuantity);
    const foundResource = projectResources.find(
      (resource) => resource._id === milestone.ResourceId
    );

    // Set the selected resource name
    if (foundResource) {
      setResources(foundResource.ResourceName);
      console.log(foundResource.ResourceName);
    }
    // Remove the selected milestones from the submitted milestoness list
    setSubmittedMilestones((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      updatedMilestones.splice(index, 1);
      return updatedMilestones;
    });

    // Open the form for editing the milestone

    setIsFormOpen(true);
    seteditedMilestone(milestone);
    setEdit(true);
  };

  const handleDeleteMilestone = (index) => {
    // Show loading modal
    swal({
      title: "Please wait...",
      text: "Deleting Milestone",
      buttons: false,
      closeOnEsc: false,
      closeOnClickOutside: false,
      icon: "info",
    });
    swal({
      title: "Are you sure?",
      text: `You are about to delete the Milestone labeled ${submittedMilestones[index].MilestoneName}`,
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        setSubmittedMilestones((prevMilestones) => {
          const updatedMilestones = [...prevMilestones];
          const milestoneId = updatedMilestones[index]._id;
          const performMilestoneDeletion = async () => {
            try {
              const response = await fetch(
                `/Users/deleteMilestone/${milestoneId}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              // Milestone successfully deleted, update state and display success message
              const data = await response.json();
              dispatch(deleteMilestone(milestoneId));

              // Close loading modal
              swal.close();

              swal("Deleted!", "The Milestone has been deleted.", "success");

              // Remove the milestone from the updated milestones list
              updatedMilestones.splice(index, 1);
              return updatedMilestones;
            } catch (error) {
              console.error("Error deleting Milestone:", error);
              // Handle error if necessary
              swal.close(); // Close loading modal
              return prevMilestones; // Return the previous state in case of error
            }
          };

          performMilestoneDeletion();

          // Return the previous state before the resource is actually deleted
          return prevMilestones;
        });
      } else {
        // Close loading modal if user cancels deletion
        swal.close();
      }
    });
  };

  const handleCancel = () => {
    setMilestoneName("");
    setMilestoneDescription("");
    setStatus("");
    setPriority("");
    setAllocatedBudget(0);
    setResources([]);
    setResourceQuantity(0);
    setIsFormOpen(false);
    setErrors({}); // Reset errors to clear any validation errors
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
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
              borderRadius: "20px",
              backgroundColor: colors.primary[400],
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: 24,
              p: 4,
              maxWidth: 700,
              width: "100%",
              outline: "none",
              height: "80%",
              overflow: "auto",
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
                      value={MilestoneName}
                      onChange={handleMilestoneNameChange}
                      error={!!errors.milestoneName} // Set error prop based on whether there's an error for this field
                      helperText={errors.milestoneName} // Display error message for this field
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#868dfb",
                          },
                      }}
                      InputLabelProps={{
                        shrink: true,
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
                      multiline
                      rows={4.5}
                      fullWidth
                      value={MilestoneDescription}
                      onChange={handleMilestoneDescriptionChange}
                      error={!!errors.description}
                      helperText={errors.description}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#868dfb",
                          },
                      }}
                      InputLabelProps={{
                        shrink: true,
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
                      value={Status}
                      onChange={handleStatusChange}
                      error={!!errors.status}
                      helperText={errors.status}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#868dfb",
                          },
                      }}
                      InputLabelProps={{
                        shrink: true,
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
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      id="priority"
                      select
                      label="Priority"
                      variant="outlined"
                      fullWidth
                      value={Priority}
                      onChange={handlePriorityChange}
                      error={!!errors.priority}
                      helperText={errors.priority}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#868dfb",
                          },
                      }}
                      InputLabelProps={{
                        shrink: true,
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
                      value={AllocatedBudget}
                      onChange={handleAllocatedBudgetChange}
                      error={!!errors.budget}
                      helperText={errors.budget}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#868dfb",
                          },
                      }}
                      InputLabelProps={{
                        shrink: true,
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
                      label="Resource"
                      variant="outlined"
                      fullWidth
                      value={resources}
                      onChange={handleResourceChange}
                      // error={!!errors.resources}
                      // helperText={errors.resources}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#868dfb",
                          },
                      }}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          "&.Mui-focused": {
                            color: "#868dfb",
                          },
                        },
                      }}
                    >
                      {projectResources.map((resource) => (
                        <MenuItem key={resource._id} value={resource._id}>
                          {resource.ResourceName}
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
                      value={ResourceQuantity}
                      onChange={handleResourceQuantityChange}
                      error={!!errors.quantity}
                      helperText={errors.quantity}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#868dfb",
                          },
                      }}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          "&.Mui-focused": {
                            color: "#868dfb",
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
                    {milestone.MilestoneName}
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
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      hyphens: "auto",
                      maxHeight: "4.5em",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {truncateDescription(milestone.MilestoneDescription)}
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
                    {milestone.Priority}
                  </Button>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Allocated Budget:{" "}
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    {milestone.AllocatedBudget}
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
                    {milestone.ResourceQuantity}
                  </Typography>
                </Typography>

                {milestoneTasks[milestone._id] &&
                  milestoneTasks[milestone._id].length > 0 && (
                    <Box mt={2}>
                      {`Tasks: ${milestoneTasks[milestone._id].length} `}
                      {milestoneTasks[milestone._id].map((task, taskIndex) => (
                        <Typography
                          variant="body1"
                          component="span"
                          color={colors.greenAccent[400]}
                          key={taskIndex}
                        >
                          {task.TaskName}
                        </Typography>
                      ))}
                    </Box>
                  )}

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
