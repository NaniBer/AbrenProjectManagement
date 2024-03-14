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
import { Project } from "../../../data/mockData";
import { useSelector } from "react-redux";

const Resource = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [daysLeft, setDaysLeft] = useState();
  const [startedDate, setStartedDate] = useState();
  const [progressData, setProgressData] = useState([]);
  const project = useSelector((state) => state.project.project);
  console.log(project);
  useEffect(() => {
    const calculateDaysLeft = (project) => {
      const today = new Date();
      const endDate = new Date(project.EndDate);
      const differenceInTime = endDate.getTime() - today.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      return differenceInDays > 0 ? differenceInDays : 0;
    };
    const calculateDaysToStart = () => {
      const today = new Date();
      const startDate = new Date(project.StartDate);
      const differenceInTime = startDate.getTime() - today.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      if (differenceInDays === 0) {
        setStartedDate("Starting today");
      } else if (differenceInDays < 0) {
        setStartedDate(
          `Started ${Math.abs(differenceInDays)} ${
            Math.abs(differenceInDays) === 1 ? "day" : "days"
          } ago`
        );
      } else {
        setStartedDate(
          `Starting in ${differenceInDays} ${
            differenceInDays === 1 ? "day" : "days"
          }`
        );
      }
    };

    const daysLeft = calculateDaysLeft(project);

    setDaysLeft(daysLeft);
    calculateDaysToStart();
  }, [project]);

  useEffect(() => {
    const calculateProgressData = (project) => {
      const taskProgresses = project.tasks.map((task) => task.progress);
      const totalProgress = taskProgresses.reduce((acc, curr) => acc + curr, 0);
      return Math.round(totalProgress / taskProgresses.length); // Average progress of all tasks
    };

    // Assuming Project is a single project object
    const progress = calculateProgressData(project);
    setProgressData([progress]); // Wrap the result in an array to maintain consistency with the previous implementation
  }, [project]);

  return (
    <Box m="20px">
      <Header title="Projects" subtitle="Manage Projects" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            sx={{
              marginTop: "20px",
              backgroundColor: colors.primary[400],
              borderRadius: "15px",
            }}
          >
            <CardContent sx={{ textAlign: "left" }}>
              <Typography variant="h4" color={colors.primary[110]}>
                {project.ProjectName}
              </Typography>
              <Typography variant="body1" sx={{ mt: 3 }}>
                Start Date:{" "}
                <Typography
                  variant="body1"
                  component="span"
                  color={colors.greenAccent[400]}
                >
                  {new Date(project.StartDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Typography>
              <Typography variant="body1">
                End Date:{" "}
                <Typography
                  variant="body1"
                  component="span"
                  color={colors.greenAccent[400]}
                >
                  {new Date(project.EndDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Typography>
              <Box display="flex">
                <Box display="flex" alignItems="center" mt={2} mr={3}>
                  <AccessTimeIcon color="secondary" />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {startedDate}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <AccessTimeIcon color="secondary" />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {daysLeft} {daysLeft === 1 ? "day" : "days"} left
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mt={2}>
                <Typography
                  variant="body1"
                  sx={{ mr: 1, marginTop: 2 }}
                  color={colors.greenAccent[400]}
                >
                  Team Members:
                </Typography>
                {project.teamMembers.map((member) => (
                  <Tooltip key={member._id} title={member.name} placement="top">
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
              <Box mt={2}>
                <LinearProgress
                  variant="determinate"
                  value={progressData}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: colors.grey[500],
                    "& .MuiLinearProgress-bar": {
                      borderRadius: "15px",
                      backgroundColor: colors.greenAccent[400],
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  align="right"
                >{`${progressData}% Complete`}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Resource;
