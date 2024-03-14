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

const Resource = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [daysLeft, setDaysLeft] = useState([]);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      const daysLeftArray = Project.map((project) => {
        const endDate = new Date(project.EndDate); // Ensure correct casing for EndDate
        const today = new Date(); // Assuming 'today' is defined somewhere in your code
        const differenceInTime = endDate.getTime() - today.getTime();
        const differenceInDays = Math.ceil(
          differenceInTime / (1000 * 3600 * 24)
        );
        return differenceInDays > 0 ? differenceInDays : 0;
      });

      setDaysLeft(daysLeftArray);
    };

    calculateDaysLeft();
  }, []);

  useEffect(() => {
    const calculateProgressData = () => {
      const progressArray = Project.map((project) => {
        const taskProgresses = project.tasks.map((task) => task.progress);
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
    <Box m="20px">
      <Header title="Projects" subtitle="Manage Projects" />
      <Grid container spacing={2}>
        {Project.map((project, index) => (
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
                  {project.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 3 }}>
                  Start Date:{" "}
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    {project.startDate}
                  </Typography>
                </Typography>
                <Typography variant="body1">
                  End Date:{" "}
                  <Typography
                    variant="body1"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    {project.endDate}
                  </Typography>
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <AccessTimeIcon color="secondary" />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {daysLeft[index]} {daysLeft[index] === 1 ? "day" : "days"}{" "}
                    left
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
                      key={member.id}
                      title={member.email}
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
                        {`${member.firstname.charAt(0)}${member.lastname.charAt(
                          0
                        )}`}
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

export default Resource;
