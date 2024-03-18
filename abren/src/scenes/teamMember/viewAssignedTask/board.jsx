import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Checkbox,
  Button,
  Modal,
  Slider,
} from "@mui/material";
import { FaCheck } from "react-icons/fa";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { replaceTasks } from "../../../Actions/projectActions";

function TaskList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [subTaskChecked, setSubtaskChecked] = useState([]);
  const [status, setStatus] = useState(0);

  const handleStatusChange = (event, newValue) => {
    console.log("hi");
    setStatus(newValue);
    console.log(newValue);
  };
  const user = useSelector((state) => state.auth.user);
  const userid = user._id;

  useEffect(() => {
    // Calculate categories based on dates
    fetch(`/Users/tasksByAssignedTo/${userid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tasks:", data);
        const taskList = data;
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        ); // Remove time from today's date

        const updatedTasks = taskList.map((task) => {
          const taskDate = new Date(task.EndDate);
          taskDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 to compare only the date part

          if (taskDate.getTime() === today.getTime()) {
            return { ...task, category: "today" };
          } else if (taskDate > today) {
            return { ...task, category: "upcoming" };
          } else if (taskDate < today) {
            return { ...task, category: "assigned" }; // Assign all tasks with end dates before today to the 'assigned' category
          }
        });
        console.log(updatedTasks);

        setTasks(updatedTasks);

        // Handle the retrieved tasks data here
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // Handle errors here
      });
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
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else if (diffDays === 2) {
      return "Day after Tomorrow";
    } else {
      const options = { weekday: "long", month: "long", day: "numeric" };
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
    const updatedTasks = tasks.map((task) =>
      task._id === selectedTaskId ? { ...task, category: newCategory } : task
    );
    setTasks(updatedTasks);
    handleMenuClose();
  };

  // Function to update the progress of a task
  const handleUpdateProgress = (taskId, subTask) => {
    // Set loading to true before starting the fetch request
    setLoading(true);

    // Update progress
    fetch(`/Users/updateProgressOfTask/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update progress");
        }
        return response.json(); // Return the response JSON data
      })
      .then((data) => {
        console.log("Progress updated successfully:", data.message);

        // Replace subtasks
        return fetch(`/Users/updatesubtasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subTasks: subTask }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Subtasks replaced successfully:", data.subTasks);
        dispatch(replaceTasks(tasks));

        // Close the modal and show SweetAlert on success
        setSelectedRowData(null);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Progress successfully recorded.",
        });
      })
      .catch((error) => {
        console.error("There was a problem:", error.message);
        // Handle error
      })
      .finally(() => {
        // Set loading to false after the fetch request completes
        setLoading(false);
      });
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const selectedTask = tasks.find((task) => task._id === taskId);
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
          const updatedTasks = tasks.filter((task) => task._id !== taskId);
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
    if (task.subTasks) {
      setSubtaskChecked(Array(task.subTasks.length).fill(false));
      calculateProgress(Array(task.subTasks.length).fill(false));
      const defaultChecked = task.subTasks.map((subTask) => subTask.completed);
      setSubtaskChecked(defaultChecked);
      calculateProgress(defaultChecked);
    }
  };

  const handleCheckboxChange = (index, subTask) => {
    const updatedChecked = [...subTaskChecked];
    updatedChecked[index] = !updatedChecked[index];
    setSubtaskChecked(updatedChecked);
    calculateProgress(updatedChecked);
    const completed = subTask.completed;
    subTask.completed = !completed;
  };

  const calculateProgress = (checkedArray) => {
    const completedCount = checkedArray.filter((item) => item).length;
    const totalCount = checkedArray.length;
    const progress = (completedCount / totalCount) * 100;
    setStatus(progress);
  };

  const kanbanColumns = [
    { id: "assigned", title: "Assigned" },
    { id: "today", title: "Today" },
    { id: "upcoming", title: "Upcoming" },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {kanbanColumns.map((column) => (
          <Grid item xs={12} md={4} key={column.id}>
            <Box
              p={2}
              bgcolor={colors.primary[100]}
              borderRadius={4}
              sx={{ backgroundColor: colors.blueAccent[300] }}
            >
              <Typography
                variant="h3"
                gutterBottom
                style={{ color: colors.grey[900] }}
              >
                {column.title}
              </Typography>

              {tasks
                .filter((task) => task.category === column.id)
                .map((task) => (
                  <Card
                    key={task._id}
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                  >
                    <CardContent sx={{ position: "relative" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task._id)}
                          sx={{
                            position: "absolute",
                            marginBottom: "10px",
                            marginLeft: "-10px",
                            "& .MuiIconButton-root": {
                              borderRadius: "50%",
                            },
                            "& .MuiSvgIcon-root": {
                              width: "1em",
                              height: "1em",
                            },
                            "&.Mui-checked .MuiSvgIcon-root": {
                              color: colors.greenAccent[500],
                            },
                          }}
                        />
                        <Typography
                          variant="body1"
                          style={{
                            marginBottom: "8px",
                            paddingLeft: "25px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleTaskClick(task)}
                        >
                          {task.TaskName}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ color: colors.greenAccent[400] }}
                      >
                        {new Date(task.EndDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={selectedRowData !== null}
        onClose={() => setSelectedRowData(null)}
      >
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
            maxWidth: 600,
            height: "70%",
            width: "100%",
            outline: "none",
            overflow: "auto",
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: colors.primary[110], paddingBottom: "15px" }}
            gutterBottom
          >
            Task Details
          </Typography>
          {selectedRowData && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                <Typography
                  variant="h5"
                  component="span"
                  sx={{
                    color: colors.greenAccent[400],
                    paddingTop: "10px",
                    paddingBottom: "15px",
                  }}
                >
                  Task Name:{" "}
                </Typography>
                {selectedRowData.TaskName}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <AccessTimeIcon color="secondary" />
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    color: colors.greenAccent[400],
                    paddingLeft: "10px",
                    paddingBottom: "15px",
                  }}
                >
                  {calculateDueDate(
                    selectedRowData.StartDate,
                    selectedRowData.EndDate
                  )}
                </Typography>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <Typography
                  variant="h5"
                  sx={{ color: colors.greenAccent[400], paddingTop: "15px" }}
                >
                  {" "}
                  Description:
                </Typography>{" "}
                {selectedRowData.TaskDescription}
              </Typography>
              {selectedRowData.subTasks &&
                selectedRowData.subTasks.length > 0 &&
                selectedRowData.subTasks.some(
                  (subTask) => subTask.name.trim().length > 0
                ) && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      <Typography
                        variant="h5"
                        component="span"
                        sx={{
                          color: colors.greenAccent[400],
                          paddingBottom: "10px",
                        }}
                      >
                        Subtasks:
                      </Typography>
                    </Typography>
                    {selectedRowData.subTasks.map((subTask, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        gutterBottom
                      >
                        <Checkbox
                          color="secondary"
                          checked={subTaskChecked[index]}
                          onChange={() => handleCheckboxChange(index, subTask)}
                        />
                        <Typography
                          variant="body2"
                          gutterBottom
                          style={{
                            color: subTaskChecked[index] ? "grey" : "inherit",
                          }}
                        >
                          {subTask.name}
                        </Typography>
                      </Box>
                    ))}

                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{
                        color: colors.greenAccent[400],
                        paddingTop: "15px",
                      }}
                    >
                      Progress: {status.toFixed(0)}%
                    </Typography>
                  </>
                )}
              {console.log(selectedRowData.status)}
              {selectedRowData.subTasks &&
                selectedRowData.subTasks.length > 0 && (
                  <Box sx={{ width: "95%" }}>
                    <Typography
                      id="progress-slider"
                      variant="h5"
                      sx={{
                        color: colors.greenAccent[400],
                        paddingTop: "20px",
                      }}
                      gutterBottom
                    >
                      Progress:
                    </Typography>
                    <Slider
                      aria-labelledby="progress-slider"
                      valueLabelDisplay="auto"
                      onChange={handleStatusChange}
                      value={status}
                      sx={{ color: colors.primary[110] }}
                    />
                  </Box>
                )}

              <Button
                variant="contained"
                color="primary"
                startIcon={<FaCheck />}
                onClick={() => toggleTaskCompletion(selectedRowData._id)}
                sx={{ position: "absolute", bottom: "20px", right: "20px" }}
              >
                Mark as Completed
              </Button>
              {console.log(selectedRowData.status)}
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaCheck />}
                onClick={() =>
                  handleUpdateProgress(
                    selectedRowData._id,
                    selectedRowData.subTasks
                  )
                }
                sx={{}}
              >
                Update Progress
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default TaskList;
