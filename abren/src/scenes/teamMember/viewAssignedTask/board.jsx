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
// import updatedTasks from "../../../data/mockData";

function TaskList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector((state) => state.auth.user);
  const userid = user._id;

  const [tasks, setTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [subTaskChecked, setSubtaskChecked] = useState([]);

  const dummyTaskData = [
    {
      id: 1,
      name: "Task 1",
      startDate: "2024-03-09",
      endDate: "2024-03-12",
      project: "Project X",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id turpis at urna tincidunt sodales sed id turpis. Mauris non leo a metus tempus gravida.",
      subtasks: ["Subtask 1", "Subtask 2", "Subtask 3"],
    },
    {
      id: 2,
      name: "Task 2",
      startDate: "2024-03-13",
      endDate: "2024-03-14",
      project: "Project Y",
      description:
        "Nullam non bibendum lectus. Donec ac ultricies libero. Sed eget dapibus odio.",
      subtasks: ["Subtask A", "Subtask B", "Subtask C"],
    },
    {
      id: 3,
      name: "Task 3",
      startDate: "2024-03-19",
      endDate: "2024-03-25",
      project: "Project Z",
      description:
        "Fusce auctor elit at magna feugiat, nec lacinia mi tempus. Fusce nec ex id magna gravida ultrices.",
    },
    {
      id: 4,
      name: "Task 4",
      startDate: "2024-03-14",
      endDate: "2024-03-15",
      project: "Project W",
      description:
        "Quisque vestibulum magna et libero ultricies, quis porttitor eros gravida.",
    },
    {
      id: 5,
      name: "Task 5",
      startDate: "2024-03-15",
      endDate: "2024-03-15",
      project: "Project V",
      description:
        "Vestibulum consequat nisl et fermentum luctus. Fusce sit amet semper mauris.",
    },
    {
      id: 6,
      name: "Task 6",
      startDate: "2024-03-18",
      endDate: "2024-03-20",
      project: "Project U",
      description:
        "Etiam malesuada felis at purus suscipit, in convallis ex fringilla.",
    },
  ];

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
      task.id === selectedTaskId ? { ...task, category: newCategory } : task
    );
    setTasks(updatedTasks);
    handleMenuClose();
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const selectedTask = tasks.find((task) => task.id === taskId);
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
          const updatedTasks = tasks.filter((task) => task.id !== taskId);
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
    setSubtaskChecked(
      task.subtasks ? Array(task.subtasks.length).fill(false) : []
    );
  };

  const handleCheckboxChange = (index) => {
    const updatedChecked = [...subTaskChecked];
    updatedChecked[index] = !updatedChecked[index];
    setSubtaskChecked(updatedChecked);
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
                          onChange={() => toggleTaskCompletion(task.id)}
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
                selectedRowData.subTasks.length > 0 && (
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
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <Typography
                          variant="body2"
                          gutterBottom
                          style={{
                            color: subTaskChecked[index] ? "grey" : "inherit",
                          }}
                        >
                          {subTask}
                        </Typography>
                      </Box>
                    ))}
                  </>
                )}

              {!selectedRowData.subtasks && (
                <Box sx={{ width: "95%" }}>
                  <Typography
                    id="progress-slider"
                    variant="h5"
                    sx={{ color: colors.greenAccent[400], paddingTop: "20px" }}
                    gutterBottom
                  >
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
                startIcon={<FaCheck />}
                onClick={() => toggleTaskCompletion(selectedRowData.id)}
                sx={{ position: "absolute", bottom: "20px", right: "20px" }}
                // marginTop= '20px'
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
