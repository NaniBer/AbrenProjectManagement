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
// import { ProjectAnalyticsReport } from "../../../data/mockData";
import { useSelector, useDispatch } from "react-redux";

const ProjectAnalyticsReportUI = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [daysLeft, setDaysLeft] = useState([]);
  const [ProjectAnalyticsReport, setProjectAnalyticsReport] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const userid = user._id;
  useEffect(() => {
    fetch(`/Users/ProjectAnalyticsReportData/${userid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the retrieved project data
        console.log("Project data:", data);
        setProjectAnalyticsReport(data);
        const calculateDaysLeft = () => {
          const today = new Date();
          const daysLeftArray = data.map((project) => {
            // Use 'data' instead of 'ProjectAnalyticsReport'
            const endDate = new Date(project.endDate);
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
        calculateDaysLeft(); // Move the function call inside the 'then' block
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  useEffect(() => {
    const calculateProgressData = () => {
      const progressArray = ProjectAnalyticsReport.map((project) => {
        const taskProgresses = project.tasks.map((task) => task.status);
        const totalProgress = taskProgresses.reduce(
          (acc, curr) => acc + curr,
          0
        );
        return Math.round(totalProgress / taskProgresses.length); // Average progress of all tasks
      });
      setProgressData(progressArray);
    };

    calculateProgressData();
  }, []);

  return (
    <Box>
      {/* <Header title="Projects" subtitle="Manage Projects" /> */}
      <Grid container spacing={2}>
        {ProjectAnalyticsReport.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                marginTop: "20px",
                backgroundColor: colors.primary[400],
                borderRadius: "15px",
              }}
            >
              <CardContent sx={{ textAlign: "left" }}>
                <Typography variant="h4" color={colors.primary[110]}>
                  {project.projectName}
                </Typography>
                <Typography variant="body1" sx={{ mt: 3 }}>
                  Start Date:{" "}
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    {new Date(project.startDate).toLocaleDateString("en-US", {
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
                    {new Date(project.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
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
                    Team Members:
                  </Typography>
                  {project.teamMembers.map((member) => (
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
                <Box mt={2}>
                  <LinearProgress
                    variant="determinate"
                    value={progressData[index]}
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
                  >{`${progressData[index]}% Complete`}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectAnalyticsReportUI;
