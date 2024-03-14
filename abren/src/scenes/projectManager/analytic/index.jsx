import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Card,
  CardContent,
  Avatar,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSelector } from "react-redux";
import { Task } from "../../../data/mockData";

const TaskAnalytics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const project = useSelector((state) => state.project.project);
  const tasks = project.tasks;

  const [daysLeft, setDaysLeft] = useState({});
  const [startedDate, setStartedDate] = useState({});
  const [progressData, setProgressData] = useState([100, 70]); // Initial progress data
  const [TaskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList(tasks);
    // console.log(tasks);
    const calculateDaysLeft = () => {
      const today = new Date();

      const daysLeftArray = TaskList.map((task) => {
        const endDate = new Date(task.EndDate);
        const differenceInTime = endDate.getTime() - today.getTime();

        const differenceInDays = Math.ceil(
          differenceInTime / (1000 * 3600 * 24)
        );

        if (differenceInDays < 0) {
          return `Overdue by ${Math.abs(differenceInDays)} ${
            Math.abs(differenceInDays) === 1 ? "day" : "days"
          }`;
        } else if (differenceInDays === 0) {
          return "Due today";
        } else {
          return `${differenceInDays} ${
            differenceInDays === 1 ? "day" : "days"
          } left`;
        }
      });
      setDaysLeft(daysLeftArray);
    };
    const calculateDaysToStart = () => {
      const today = new Date();
      const daysToStartArray = TaskList.map((task) => {
        const startDate = new Date(task.StartDate);
        const differenceInTime = startDate.getTime() - today.getTime();
        const differenceInDays = Math.ceil(
          differenceInTime / (1000 * 3600 * 24)
        );

        if (differenceInDays === 0) {
          return "Starting today";
        } else if (differenceInDays < 0) {
          return `Started ${Math.abs(differenceInDays)} ${
            Math.abs(differenceInDays) === 1 ? "day" : "days"
          } ago`;
        } else {
          return `Starting in ${differenceInDays} ${
            differenceInDays === 1 ? "day" : "days"
          }`;
        }
      });
      setStartedDate(daysToStartArray);
    };

    calculateDaysLeft();
    calculateDaysToStart();
  }, [TaskList, tasks]);

  // Dummy function to update progress data
  const updateProgressData = () => {
    // Simulating new progress data
    const newProgressData = [80, 50]; // Assuming you have new progress data for each task
    setProgressData(newProgressData);
  };

  // Simulating progress data update after some time
  useEffect(() => {
    const interval = setInterval(() => {
      updateProgressData();
    }, 5000); // Update progress data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Analytics"
        subtitle="Shows analytics of tasks and projects"
      />
      <Grid container spacing={2}>
        {TaskList.map((task, index) => (
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
                    {task.TaskName}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mt: 3 }}>
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    Start Date:{" "}
                  </Typography>
                  {startedDate[index]}
                </Typography>
                <Typography variant="body1">
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    End Date:{" "}
                  </Typography>
                  {new Date(task.EndDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <AccessTimeIcon color="secondary" />

                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {daysLeft[index]}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography
                    variant="body1"
                    sx={{ mr: 1, marginTop: 2 }}
                    color={colors.greenAccent[400]}
                  >
                    Assigned To:
                  </Typography>
                  {task.assignedTo.map((member) => (
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
                {/* Linear Progress Bar */}
                <Box mt={2}>
                  <LinearProgress
                    variant="determinate"
                    value={progressData[index]} // Set the value dynamically
                    sx={{
                      borderRadius: "10px", // Adjust border radius
                      backgroundColor: colors.grey[500], // Change background color
                      "& .MuiLinearProgress-bar": {
                        borderRadius: "15px", // Adjust border radius for the bar
                        backgroundColor: colors.greenAccent[400], // Change progress bar color
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    align="right"
                  >{`${progressData[index]}%`}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskAnalytics;
