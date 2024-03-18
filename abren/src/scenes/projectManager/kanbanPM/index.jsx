import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  useTheme,
  Modal,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  addTodo,
  deleteTodo,
  editTodo,
  loadTodos,
} from "../../../Actions/projectActions";

const TaskCategory = ({ category, tasks }) => (
  <div className="text-primary">
    <h3>{category}</h3>
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>{task.taskName}</li>
      ))}
    </ul>
  </div>
);

const Kanban = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [today, setToday] = useState("");
  const [submittedtask, setSubmittedTask] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // Add state variable for modal mode
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const userid = user._id;

  useEffect(() => {
    setDueDate(new Date());
    setToday(dayjs(new Date()));

    // Show loading spinner
    Swal.fire({
      title: "Loading",
      html: "Fetching todos...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch(`/Users/view/${userid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const statusCode = response.status;
        if (!statusCode === 200) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Hide loading spinner
        Swal.close();
        setSubmittedTask(data.todos);
        dispatch(loadTodos(data.todo));
        console.log(data.todos);
      })
      .catch((error) => {
        console.error("Request failed with status code:", error);
        // Hide loading spinner and show error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch todos",
        });
      });
  }, []);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTodoData = {
      TodoName: taskName,
      Date: dueDate,
      Status: status,
      Priority: priority,
    };

    if (modalMode === "add") {
      try {
        const response = await fetch("/Users/addTodolist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTodoData),
        });

        if (response.status === 201) {
          const data = await response.json();
          updatedTodoData._id = data.todo._id;
          setSubmittedTask((prevTask) => [...prevTask, updatedTodoData]);

          // Show success message using SweetAlert
          Swal.fire({
            icon: "success",
            title: "Task Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(addTodo(updatedTodoData));
        } else {
          throw new Error("Failed to create todo list");
        }
      } catch (error) {
        console.error("Error creating todo list:", error.message);
        // Handle error (e.g., display an error message)
      }
    } else if (modalMode === "edit" && editingTaskId !== null) {
      try {
        const response = await fetch(`/Users/updateTodo/${editingTaskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodoData),
        });

        if (response.ok) {
          // Update the submittedTask state with the updated task
          const updatedTasks = submittedtask.map((task) =>
            task._id === editingTaskId ? { ...task, ...updatedTodoData } : task
          );
          setSubmittedTask(updatedTasks);
          setEditingTaskId(null);

          // Show success message using SweetAlert
          Swal.fire({
            icon: "success",
            title: "Task Edited Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(editTodo(updatedTodoData));
        } else {
          throw new Error("Failed to update todo list");
        }
      } catch (error) {
        console.error("Error updating todo list:", error.message);
        // Handle error (e.g., display an error message)
      }
    }

    setTaskName("");
    setDueDate(new Date());
    setStatus("");
    setPriority("");

    setIsFormOpen(false);
    setModalMode("add"); // Reset modal mode to "add"
  };

  const handleEditModalSubmit = (e) => {
    e.preventDefault();

    const updatedTasks = submittedtask.map((task) => {
      if (task._id === editingTaskId) {
        return {
          ...task,
          status,
        };
      }
      return task;
    });

    setSubmittedTask(updatedTasks);
    setEditingTaskId(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    // Display confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // If user confirms, proceed with the deletion
        try {
          const response = await fetch(`/Users/delete/${taskId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });

          const statusCode = response.status;
          if (statusCode == 403) {
            throw new Error("Unauthorized");
          } else if (statusCode === 500) {
            throw new Error("Failed to delete todo");
          } else {
            const data = await response.json();
            console.log(data.message); // Log success message
            setSubmittedTask((prevTasks) =>
              prevTasks.filter((task) => task._id !== taskId)
            );
            // Show success message using SweetAlert
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
            dispatch(deleteTodo(taskId));
          }
        } catch (error) {
          console.error("Error deleting todo:", error.message);
          // Show error message using SweetAlert
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Error deleting task: ${error.message}`,
          });
        }
      }
    });
  };

  const handleEditTask = (taskId) => {
    const task = submittedtask.find((task) => task._id === taskId);

    if (task) {
      setTaskName(task.TodoName);
      setDueDate(new Date(task.Date));
      setStatus(task.Status);
      setPriority(task.Priority);
      setEditingTaskId(taskId);
      setIsFormOpen(true); // Open the form modal
      setModalMode("edit"); // Set modal mode to "edit"
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const calculateDaysLeft = (dueDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.round((due - today) / oneDay); // Calculating difference with due date first

    if (diffDays < 0) {
      // If due date has passed
      return "Overdue";
    } else if (diffDays === 0) {
      // If due date is today
      return "Due today";
    } else {
      // If due date is in the future
      return `${diffDays} days left`;
    }
  };
  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Todo List" subtitle="Categorizes your tasks" />

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => setIsFormOpen(true)}
            sx={{
              color: "white",
              backgroundColor: colors.primary[400],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
              ml: "10px",
              mb: "15px",
            }}
          >
            {modalMode === "add" ? "Add Task" : "Edit Task"}
          </Button>
        </Box>
      </Box>
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
            {modalMode === "add" ? "Add Task" : "Edit Task"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                id="taskName"
                label="Task Name"
                variant="outlined"
                fullWidth
                value={taskName}
                onChange={handleTaskNameChange}
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
              <LocalizationProvider dateAdapter={AdapterDayjs} label>
                <DatePicker
                  id="dueDate"
                  label="Due Date"
                  variant="outlined"
                  value={today}
                  minDate={today}
                  onChange={(newValue) => setDueDate(newValue.$d)}
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
              </LocalizationProvider>
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

            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained">
                {modalMode === "add" ? "Submit" : "Save"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <div className="container">
        <div className="d-flex">
          <div className="col">
            <div
              className="card"
              style={{
                backgroundColor: colors.blueAccent[300],
                marginRight: "10px",
              }}
            >
              <div className="card-body">
                <h3 style={{ color: colors.grey[900] }}>Todo</h3>
                {submittedtask
                  .filter((task) => task.Status === "Not Started")
                  .map((task) => (
                    <Card
                      key={task._id}
                      sx={{ mt: 1, backgroundColor: "fffff" }}
                    >
                      <CardContent>
                        <Typography
                          variant="body1"
                          style={{ fontSize: "1.2rem", marginBottom: "8px" }}
                        >
                          {task.TodoName}
                        </Typography>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <AccessTimeIcon
                              style={{
                                marginBottom: "8px",
                                marginRight: "4px",
                                color: colors.greenAccent[400],
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                marginBottom: "8px",
                                fontSize: "15px",
                                paddingLeft: "25px",
                              }}
                            >
                              {calculateDaysLeft(task.Date)} (
                              {new Date(task.Date).toISOString().slice(0, 10)})
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "4px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                marginRight: "8px",
                                fontSize: "15px",
                                color: colors.greenAccent[400],
                              }}
                            >
                              Priority:
                            </Typography>
                            <Button
                              size="small"
                              sx={{
                                marginTop: "8px",
                                padding: "6px 6px",
                                height: "20px",
                                width: "20px",
                              }}
                              variant="contained"
                              color={
                                task.Priority === "High"
                                  ? "error"
                                  : task.Priority === "Medium"
                                  ? "warning"
                                  : "success"
                              }
                            >
                              {task.Priority}
                            </Button>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton
                            onClick={() => handleEditTask(task._id)}
                            color="secondary"
                            size="small"
                            sx={{ paddingBottom: "1px" }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteTask(task._id)}
                            color="secondary"
                            size="small"
                            sx={{ paddingBottom: "1px" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className="card"
              style={{
                backgroundColor: colors.blueAccent[300],
                marginRight: "10px",
              }}
            >
              <div className="card-body">
                <h3 style={{ color: colors.grey[900] }}>In Progress</h3>
                {submittedtask
                  .filter((task) => task.Status === "In Progress")
                  .map((task) => (
                    <Card
                      key={task._id}
                      sx={{ mt: 1, backgroundColor: "fffff" }}
                    >
                      <CardContent>
                        <Typography
                          variant="body1"
                          style={{ fontSize: "1.2rem", marginBottom: "8px" }}
                        >
                          {task.TodoName}
                        </Typography>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <AccessTimeIcon
                              style={{
                                marginBottom: "8px",
                                marginRight: "4px",
                                color: colors.greenAccent[400],
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                marginBottom: "8px",
                                fontSize: "15px",
                                paddingLeft: "25px",
                              }}
                            >
                              {calculateDaysLeft(task.Date)} (
                              {new Date(task.Date).toISOString().slice(0, 10)})
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "4px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                marginRight: "8px",
                                fontSize: "15px",
                                color: colors.greenAccent[400],
                              }}
                            >
                              Priority:
                            </Typography>
                            <Button
                              size="small"
                              sx={{
                                marginTop: "8px",
                                padding: "6px 6px",
                                height: "20px",
                                width: "20px",
                              }}
                              variant="contained"
                              color={
                                task.Priority === "High"
                                  ? "error"
                                  : task.Priority === "Medium"
                                  ? "warning"
                                  : "success"
                              }
                            >
                              {task.Priority}
                            </Button>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton
                            onClick={() => handleEditTask(task._id)}
                            color="secondary"
                            size="small"
                            sx={{ paddingBottom: "1px" }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteTask(task._id)}
                            color="secondary"
                            size="small"
                            sx={{ paddingBottom: "1px" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className="card"
              style={{ backgroundColor: colors.blueAccent[300] }}
            >
              <div className="card-body">
                <h3 style={{ color: colors.grey[900] }}>Done</h3>
                {submittedtask
                  .filter((task) => task.Status === "Completed")
                  .map((task) => (
                    <Card
                      key={task._id}
                      sx={{ mt: 1, backgroundColor: "fffff" }}
                    >
                      <CardContent>
                        <Typography
                          variant="body1"
                          style={{ fontSize: "1.2rem", marginBottom: "8px" }}
                        >
                          {task.TodoName}
                        </Typography>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <AccessTimeIcon
                              style={{
                                marginBottom: "8px",
                                marginRight: "4px",
                                color: colors.greenAccent[400],
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                marginBottom: "8px",
                                fontSize: "15px",
                                paddingLeft: "25px",
                              }}
                            >
                              {calculateDaysLeft(task.Date)} (
                              {new Date(task.Date).toISOString().slice(0, 10)})
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "4px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                marginRight: "8px",
                                fontSize: "15px",
                                color: colors.greenAccent[400],
                              }}
                            >
                              Priority:
                            </Typography>
                            <Button
                              size="small"
                              sx={{
                                marginTop: "8px",
                                padding: "6px 6px",
                                height: "20px",
                                width: "20px",
                              }}
                              variant="contained"
                              color={
                                task.Priority === "High"
                                  ? "error"
                                  : task.Priority === "Medium"
                                  ? "warning"
                                  : "success"
                              }
                            >
                              {task.Priority}
                            </Button>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton
                            onClick={() => handleEditTask(task._id)}
                            color="secondary"
                            size="small"
                            sx={{ paddingBottom: "1px" }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteTask(task._id)}
                            color="secondary"
                            size="small"
                            sx={{ paddingBottom: "1px" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kanban;
