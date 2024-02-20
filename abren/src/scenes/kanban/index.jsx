import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
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
import { tokens } from "../../theme";
const TaskCategory = ({ category, tasks }) => (
  <div class="text-primary">
    <h3>{category}</h3>
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.taskName}</li>
      ))}
    </ul>
  </div>
);

const Kanban = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [submittedtask, setSubmittedTask] = useState([]);

  useEffect(() => {
    setDueDate(dayjs(new Date()));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new Milestone object
    const newTask = {
      taskName,
      dueDate,
      status,
      priority,
    };

    // Update the submitted miletsones list
    setSubmittedTask((prevTask) => [...prevTask, newTask]);

    // Clear the form fields
    setTaskName("");
    setDueDate(dayjs(new Date()));
    setStatus("");
    setPriority("");

    setIsFormOpen(false); // Close the form after submission
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h2">
          TODO
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
          Add Task
        </Button>

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
                Add Task
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
                      fullWidth
                      value={dueDate}
                      minDate={dueDate}
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
      </Box>

      <div className="container">
        <div className="d-flex">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <TaskCategory
                  category="Todo"
                  tasks={submittedtask.filter(
                    (task) => task.status === "Not Started"
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <TaskCategory
                  category="In Progress"
                  tasks={submittedtask.filter(
                    (task) => task.status === "In Progress"
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <TaskCategory
                  category="Done"
                  tasks={submittedtask.filter(
                    (task) => task.status === "Completed"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kanban;
