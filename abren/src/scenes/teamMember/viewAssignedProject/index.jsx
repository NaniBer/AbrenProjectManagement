import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { dummyProjectData } from "../../../data/mockData";
import { useSelector, useDispatch } from "react-redux";

const formatDate = (startDate, endDate) => {
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
};

const Project = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector((state) => state.auth.user);
  const userid = user._id;

  const [selectedProject, setSelectedProject] = useState(null);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetch(`/Users/projectsByTeamMember/${userid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      })
      .then((projects) => {
        // Handle the retrieved projects data
        console.log("Projects assigned to the team member:", projects);
        setProjectList(projects);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  return (
    <Box m="20px" display="flex">
      <Box flex="1">
        <Header
          title="View My Projects"
          subtitle="View project I am assigned to"
        />

        <Grid container spacing={2}>
          {projectList.map((project, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  marginTop: "20px",
                  backgroundColor: colors.primary[400],
                  borderRadius: "15px",
                }}
              >
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography
                    variant="h4"
                    sx={{ mb: 1 }}
                    color={colors.primary[110]}
                    onClick={() => handleProjectClick(project)}
                  >
                    {project.ProjectName}
                  </Typography>
                  <Typography variant="body1">
                    {project.ProjectDescription}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Render project details */}
      {selectedProject && (
        <Box
          flex="1"
          ml={2}
          mt={13}
          position="relative"
          sx={{
            backgroundColor: colors.primary[400],
            borderRadius: "15px",
          }}
        >
          <CardContent sx={{ textAlign: "left" }}>
            <Typography
              variant="h3"
              marginBottom="20px"
              marginTop="2px"
              color={colors.primary[110]}
            >
              {selectedProject.ProjectName}
            </Typography>
            {/* <Typography variant="body1" color={colors.greenAccent[400]}>
              Start Date: {selectedProject.startDate}
            </Typography> */}
            <Typography marginBottom="8px">
              <AccessTimeIcon color="secondary" />

              <Typography
                variant="body1"
                component="span"
                marginBottom="4px"
                marginRight="5px"
                color={colors.greenAccent[400]}
              >
                {/* Due Date:  */}
              </Typography>
              {formatDate(selectedProject.StartDate, selectedProject.EndDate)}
            </Typography>
            <Typography marginBottom="8px">
              <Typography
                variant="body1"
                component="span"
                marginBottom="4px"
                marginRight="5px"
                color={colors.greenAccent[400]}
              >
                Description:
              </Typography>
              {selectedProject.ProjectDescription}
            </Typography>
            <Typography
              variant="body1"
              marginBottom="4px"
              color={colors.greenAccent[400]}
            >
              Tasks:
            </Typography>
            <ul>
              {selectedProject.tasks.map((task, index) => (
                <li key={index}>
                  <Typography variant="body2">{task.TaskName}</Typography>
                </li>
              ))}
            </ul>
            <Button
              onClick={handleCloseDetails}
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "white",
              }}
            >
              <CloseIcon />
            </Button>
          </CardContent>
        </Box>
      )}
    </Box>
  );
};

export default Project;
