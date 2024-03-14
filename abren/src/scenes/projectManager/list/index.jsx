import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import the expand icon
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import swal from "sweetalert";
import { mockDataTeam } from "../../../data/mockData";
import { Card, CardContent } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { addTask, deleteTask, editTask } from "../../../Actions/projectActions";

const MAX_DESCRIPTION_LENGTH = 100;
const MAX_SUBTASK_LENGTH = 100;

const validationSchema = Yup.object().shape({
  TaskName: Yup.string().required("Task List is required"),
  StartDate: Yup.date().required("Start Date is required"),
  EndDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("StartDate"), "End Date must be after Start Date"),
  TaskDescription: Yup.string().required("TaskDescription is required"),
  teamMembers: Yup.array()
    .required("Team Members are required")
    .min(1, "Please select at least one team member"),
});

const truncateTaskDescription = (TaskDescription) => {
  if (TaskDescription.length <= MAX_DESCRIPTION_LENGTH) {
    return TaskDescription;
  }
  return `${TaskDescription.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
};

const truncateSubtask = (subtask) => {
  if (subtask.length <= MAX_SUBTASK_LENGTH) {
    return subtask;
  }
  return `${subtask.substring(0, MAX_SUBTASK_LENGTH)}...`;
};
const Task = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const [TaskName, setTaskName] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [subTasks, setSubtasks] = useState([""]);
  const [expandedCardIndex, setExpandedCardIndex] = useState(-1); // Initialize with -1 to indicate no card is expanded
  const [teamMembers, setTeamMembers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedTask, setEditedTask] = useState();
  const project = useSelector((state) => state.project.project);
  const tasks = project.tasks;
  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  useEffect(() => {
    setSubmittedTasks(tasks);
  }, [tasks]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleSubtaskChange = (index, e) => {
    const updatedSubtasks = [...subTasks];
    updatedSubtasks[index] = e.target.value;
    setSubtasks(updatedSubtasks);
  };
  const handleAddTask = () => {
    setTeamMembers(project.teamMembers);
    console.log(project.teamMembers);
    setIsFormOpen(true);
  };
  const handleAddSubtask = () => {
    setSubtasks([...subTasks, ""]);
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = [...subTasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const handleCancel = () => {
    setTaskName("");
    setStartDate("");
    setEndDate("");
    setTaskDescription("");
    setAssignedTo([]);
    setValidationErrors({});
    if (edit) {
      setSubmittedTasks([...submittedTasks, editedTask]);
    }
    setEdit(false);
    setIsFormOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        {
          TaskName,
          StartDate,
          EndDate,
          TaskDescription,
          teamMembers: assignedTo.map((user) => ({
            _id: user._id,
            name: user.name,
          })),
        },
        { abortEarly: false }
      );

      const newTask = {
        TaskName,
        StartDate,
        EndDate,
        TaskDescription,
        assignedTo,
        subTasks,
        projectId: project._id,
      };

      // Check for duplicate task name while adding
      const isDuplicate = submittedTasks.some(
        (task) => task.TaskName === TaskName
      );
      console.log(TaskName);

      if (isDuplicate) {
        // Close loading modal
        swal.close();
        // Show error message for duplicate name
        swal("Error!", "Task name already exists", "error");
      } else {
        // Show loading modal
        swal({
          title: "Please wait...",
          text: edit ? "Updating Task" : "Creating Task",
          buttons: false,
          closeOnEsc: false,
          closeOnClickOutside: false,
          icon: "info",
        });

        if (edit) {
          // Editing an existing Task
          try {
            const response = await fetch(
              `/Users/updateTask/${editedTask._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            // Clear the form fields
            setTaskName("");
            setStartDate("");
            setEndDate("");
            setTaskDescription("");
            setAssignedTo([]);
            setSubtasks([""]);
            setValidationErrors({}); // Reset validation errors
            setIsFormOpen(false);

            // Update submitted tasks
            setSubmittedTasks((prevTasks) => [
              ...prevTasks.filter(
                (task) => task.TaskName !== editedTask.TaskName
              ),
              newTask,
            ]);

            dispatch(editTask(data.updatedTask));
            console.log(project.tasks);

            // Close loading modal
            swal.close();

            // Show success message
            swal("Success!", "Task updated successfully", "success");
          } catch (error) {
            console.error("Error updating Task:", error);
            // Close loading modal
            swal.close();
          }
        } else {
          //Adding A new Task

          try {
            // Check for duplicate task name while editing
            const isDuplicateEdit = submittedTasks.some(
              (task) => task.TaskName === TaskName
            );

            if (isDuplicateEdit) {
              // Close loading modal
              swal.close();
              // Show error message for duplicate name
              swal("Error!", "Task name already exists", "error");
            } else {
              const response = await fetch("/Users/TaskAssign", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
              });

              if (!response.ok) {
                throw new Error("Failed to assign task");
              }

              const data = await response.json();
              console.log(data); // Response from the server
              const task = data.task;
              console.log(task);
              setSubmittedTasks((prevTasks) => [...prevTasks, data.task]);
              dispatch(addTask(data.task));
              console.log(data.task);

              setTaskName("");
              setStartDate("");
              setEndDate("");
              setTaskDescription("");
              setAssignedTo([]);
              setSubtasks([""]);
              setValidationErrors({}); // Reset validation errors
              setIsFormOpen(false);
              // Close loading modal
              swal.close();

              // Show success message
              swal("Success!", "Task added successfully", "success");
            }
          } catch (error) {
            console.error("Error assigning task:", error.message);
            throw error; // Rethrow the error to handle it in the calling code
          }
        }
      }
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

  const handleEditTask = (index) => {
    const task = submittedTasks[index];

    setTaskName(task.TaskName);
    setStartDate(task.StartDate.substring(0, 10));
    setEndDate(task.EndDate.substring(0, 10));
    setTaskDescription(task.TaskDescription);
    setAssignedTo(task.assignedTo);
    setSubtasks(task.subTasks);
    setTeamMembers(project.teamMembers);
    console.log(task);
    setEditedTask(task);
    setEdit(true);

    setSubmittedTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });

    setIsFormOpen(true);
  };

  const handleDeleteTask = (index) => {
    console.log(submittedTasks[index]);

    // Show loading modal
    swal({
      title: "Please wait...",
      text: "Deleting Task",
      buttons: false,
      closeOnEsc: false,
      closeOnClickOutside: false,
      icon: "info",
    });

    swal({
      title: "Are you sure?",
      text: `You are about to delete the Task labeled ${submittedTasks[index].TaskeName}`,
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        setSubmittedTasks((prevTasks) => {
          const updatedTask = [...prevTasks];
          const taskId = updatedTask[index]._id;
          const performTaskDeletion = async () => {
            try {
              const response = await fetch(`/Users/deleteTask/${taskId}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              // Task successfully deleted, update state and display success message
              const data = await response.json();
              dispatch(deleteTask(taskId));

              // Close loading modal
              swal.close();

              swal("Deleted!", "The row has been deleted.", "success");

              // Remove the task from the updated tasks list
              updatedTask.splice(index, 1);
              return updatedTask;
            } catch (error) {
              console.error("Error deleting Task:", error);
              // Handle error if necessary
              swal.close(); // Close loading modal
              return prevTasks; // Return the previous state in case of error
            }
          };

          performTaskDeletion();
          return prevTasks;
        });
      } else {
        swal.close();
      }
    });
  };
  const handleExpandCard = (index) => {
    setExpandedCardIndex(index === expandedCardIndex ? -1 : index);
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Task List" subtitle="Manages the List of Tasks" />
        <Button
          startIcon={<AddIcon />}
          sx={{
            color: theme.palette.common.white,
            backgroundColor: colors.primary[400],
            fontSize: "12px",
            fontWeight: "bold",
            padding: "10px 20px",
            justifyContent: "end",
          }}
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </Box>

      <Modal open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: colors.primary[400],
            borderRadius: "20px",
            boxShadow: 24,
            p: 4,
            maxWidth: 800,
            height: "80%",
            width: "100%",
            outline: "none",
            overflow: "auto",
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
                    id="TaskName"
                    label="Task Name"
                    variant="outlined"
                    fullWidth
                    value={TaskName}
                    onChange={handleTaskNameChange}
                    error={!!validationErrors.TaskName}
                    helperText={validationErrors.TaskName}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: validationErrors.TaskName
                            ? "red"
                            : "#868dfb",
                        },
                    }}
                    InputLabelProps={{
                      sx: {
                        "&.Mui-focused": {
                          color: validationErrors.TaskName ? "red" : "#868dfb",
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="StartDate"
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={StartDate}
                    onChange={handleStartDateChange}
                    error={!!validationErrors.StartDate}
                    helperText={validationErrors.StartDate}
                    sx={{
                      "& .MuiIconButton-root": {
                        color: "#868dfb", // Change the color of the icon
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: validationErrors.StartDate
                            ? "red"
                            : "#868dfb",
                        },
                    }}
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        "&.Mui-focused": {
                          color: validationErrors.StartDate ? "red" : "#868dfb",
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="TaskDescription"
                    label="TaskDescription"
                    variant="outlined"
                    multiline
                    rows={3}
                    fullWidth
                    value={TaskDescription}
                    onChange={handleTaskDescriptionChange}
                    error={!!validationErrors.TaskDescription}
                    helperText={validationErrors.TaskDescription}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: validationErrors.TaskDescription
                            ? "red"
                            : "#868dfb",
                        },
                    }}
                    InputLabelProps={{
                      sx: {
                        "&.Mui-focused": {
                          color: validationErrors.TaskDescription
                            ? "red"
                            : "#868dfb",
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
                    options={teamMembers
                      .filter(
                        (user) =>
                          !assignedTo.find(
                            (selectedUser) => selectedUser._id === user._id
                          )
                      )
                      .map((user) => ({
                        _id: user._id,
                        name: user.name,
                      }))}
                    getOptionLabel={(option) => option.name}
                    value={assignedTo}
                    onChange={(event, value) => setAssignedTo(value)}
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
                    id="EndDate"
                    label="End Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={EndDate}
                    onChange={handleEndDateChange}
                    error={!!validationErrors.EndDate}
                    helperText={validationErrors.EndDate}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: validationErrors.EndDate
                            ? "red"
                            : "#868dfb",
                        },
                    }}
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        "&.Mui-focused": {
                          color: validationErrors.EndDate ? "red" : "#868dfb",
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
                    {subTasks.map((subtask, index) => (
                      <Grid item xs={12} key={index}>
                        <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                          <TextField
                            label={`Subtask ${index + 1}`}
                            variant="outlined"
                            fullWidth
                            value={subtask}
                            onChange={(e) => handleSubtaskChange(index, e)}
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
                          <Button onClick={() => handleRemoveSubtask(index)}>
                            <DeleteIcon />
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Button
                    onClick={handleAddSubtask}
                    color="secondary"
                    startIcon={<AddIcon />}
                  >
                    Add Subtask
                  </Button>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={edit ? <EditIcon /> : <AddIcon />}
                  >
                    {edit ? "Edit" : "Add"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Grid container spacing={2}>
        {submittedTasks.map((Task, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                marginTop: "20px",
                backgroundColor: colors.primary[400],
                borderRadius: "15px",
              }}
            >
              <CardContent sx={{ textAlign: "left" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h3" color={colors.primary[110]}>
                    {Task.TaskName}
                  </Typography>
                  {/* Expand button */}
                  <Button
                    onClick={() => handleExpandCard(index)}
                    color="secondary"
                  >
                    <ExpandMoreIcon />
                  </Button>
                </Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    Start Date:{" "}
                  </Typography>
                  {new Date(Task.StartDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
                <Typography variant="body1">
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    End Date:{" "}
                  </Typography>
                  {new Date(Task.EndDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>

                <Tooltip title={Task.TaskDescription} arrow>
                  <Typography
                    variant="body1"
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
                    <Typography
                      variant="body1"
                      component="span"
                      color={colors.greenAccent[400]}
                    >
                      Description:{" "}
                    </Typography>
                    {truncateTaskDescription(Task.TaskDescription)}
                  </Typography>
                </Tooltip>

                <Box display="flex" alignItems="center" mt={2}>
                  <Typography
                    variant="body1"
                    sx={{ mr: 1, marginTop: 2 }}
                    color={colors.greenAccent[400]}
                  >
                    Team Members:
                  </Typography>
                  {Task.assignedTo.map((member) => (
                    <Tooltip
                      key={member._id}
                      title={member.name}
                      placement="top"
                    >
                      <Avatar
                        key={member.id}
                        sx={{
                          bgcolor: colors.primary[110],
                          height: "30px",
                          width: "30px",
                          mr: 1,
                        }}
                      >
                        {member.name
                          .split(" ")
                          .map((word) => word.charAt(0))
                          .join("")}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Box>

                {/* Display subTasks only if this card is expanded */}
                {expandedCardIndex === index && (
                  <>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                      Subtasks:
                    </Typography>
                    {Task.subTasks.map((subtask, subtaskIndex) => (
                      <Tooltip title={subtask} arrow>
                        <Typography
                          key={subtaskIndex}
                          variant="body1"
                          sx={{ mb: 3 }}
                        >
                          {`- ${truncateSubtask(subtask)}`}{" "}
                          {/* Use truncateSubtask function here */}
                        </Typography>
                      </Tooltip>
                    ))}
                  </>
                )}

                <Box display="flex" justifyContent="flex-end" mt={5}>
                  <Button
                    color="secondary"
                    width="2px"
                    height="2px"
                    // startIcon={<EditIcon />}
                    onClick={() => handleEditTask(index)}
                    sx={{ mr: -3 }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    width="5px"
                    height="5px"
                    // startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteTask(index)}
                  >
                    Delete
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

export default Task;
