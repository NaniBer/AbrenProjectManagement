import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
  Card,
  CardContent,
  Avatar,
  Grid,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import * as Yup from "yup";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";

import swal from "sweetalert";
import dayjs from "dayjs";

const MAX_BUDGET_LENGTH = 10; // Assuming a maximum of 10 characters for the budget
const validationSchema = Yup.object().shape({
  StartDate: Yup.date().required("Start Date is required"),
  EndDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("StartDate"), "End Date must be after Start Date"),
  Budget: Yup.number()
    .positive("Budget must be a positive number")
    .required("Budget is required"),
  teamMembers: Yup.array()
    .required("Team Members are required")
    .min(1, "Please select at least one team member"),
});

const Project = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const project = useSelector((state) => state.project.project);
  console.log(project);

  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Budget, setBudget] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedProjects, setSubmittedProjects] = useState(project);
  const [validationErrors, setValidationErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(-1);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleCancel = () => {
    setStartDate("");
    setEndDate("");
    setBudget("");
    setSelectedTeamMembers([]);
    setValidationErrors({});
    setIsFormOpen(false);
    setEditingIndex(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading modal
    swal({
      title: "Please wait...",
      text: "Adding details",
      buttons: false,
      closeOnEsc: false,
      closeOnClickOutside: false,
      icon: "info",
    });

    try {
      await validationSchema.validate(
        {
          StartDate,
          EndDate,
          Budget,
          teamMembers: selectedTeamMembers, // Include selected team members in validation
        },
        { abortEarly: false }
      );

      const newProject = {
        ...submittedProjects,
        StartDate,
        EndDate,
        Budget,
        teamMembers: selectedTeamMembers,
      };

      console.log(newProject);

      setSubmittedProjects(newProject);
      try {
        const response = await fetch(
          `/Users/addProjectDetails/${newProject._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProject),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add project details");
        }

        const result = await response.json();
        console.log(result); // Assuming the server responds with some data

        // Close loading modal
        swal.close();

        // Show success message using SweetAlert
        swal("Success!", "Details added successfully", "success");
      } catch (error) {
        console.error("Error adding project details:", error.message);
        // Close loading modal
        swal.close();
        // Show error message using SweetAlert
        swal("Error!", "Failed to add details", "error");
      }

      // Reset form fields, state, and selected team members
      setStartDate("");
      setEndDate("");
      setBudget("");
      setValidationErrors({});
      setIsFormOpen(false);
      setEditingIndex(-1);
      setSelectedTeamMembers([]); // Clear selected team members
      setSelectedTeamMembers([]); // Clear selected team members
    } catch (error) {
      console.error(error);
      // Handle validation errors here
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setValidationErrors(errors);
      // Close loading modal
      swal.close();
    }
  };

  const handleEditProject = (index) => {
    const project = submittedProjects;
    // Populate form fields with project data
    setStartDate(project.StartDate || "");
    setEndDate(project.EndDate || "");
    setBudget(project.Budget || "");

    //Get active users
    fetch("/Users/activeUsers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to retrieve active users");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the retrieved active users data

        const activeUsers = data.map((user) => ({
          _id: user._id,
          name: `${user.firstname} ${user.lastname}`,
        }));

        // Set selectedTeamMembers with the extracted data
        setActiveUsers(activeUsers);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setSelectedTeamMembers(project.teamMembers);
    // Toggle editing state
    setEditingIndex(editingIndex === index ? -1 : index);
    // Open the modal for editing
    setIsFormOpen(true);
  };

  return (
    <Box m="20px">
      <Header title="Project Info" subtitle="More information about projects" />

      <Modal open={isFormOpen} onClose={handleCancel}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 800,
            height: "70%",
            width: "100%",
            outline: "none",
            overflow: "auto",
            backgroundColor: colors.primary[400],
            borderRadius: "10px",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            {editingIndex !== -1 ? "Update Project" : "Add Project"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="projectName"
                    label="Project Name"
                    variant="outlined"
                    fullWidth
                    value={submittedProjects.ProjectName || ""}
                    InputProps={{
                      readOnly: true,
                    }}
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
                          color: validationErrors.EndDate ? "red" : "#868dfb",
                        },
                      },
                    }}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={submittedProjects.ProjectDescription || ""}
                    InputProps={{
                      readOnly: true,
                    }}
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
                          color: validationErrors.EndDate ? "red" : "#868dfb",
                        },
                      },
                    }}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="projectManager"
                    label="Project Manager"
                    variant="outlined"
                    fullWidth
                    value={submittedProjects.projectManager.username || ""}
                    InputProps={{
                      readOnly: true,
                    }}
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
                          color: validationErrors.EndDate ? "red" : "#868dfb",
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
                    options={activeUsers}
                    getOptionLabel={(option) => `${option.name}`}
                    value={selectedTeamMembers}
                    onChange={(event, value) => setSelectedTeamMembers(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Team Members"
                        fullWidth
                        error={!!validationErrors.teamMembers}
                        helperText={validationErrors.teamMembers}
                        placeholder="Project Manager"
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
                          color: validationErrors.EndDate ? "red" : "#868dfb",
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
                    options={activeUsers
                      .filter(
                        (user) =>
                          !selectedTeamMembers.find(
                            (selectedUser) => selectedUser._id === user._id
                          )
                      )
                      .map((user) => ({
                        _id: user._id,
                        name: user.name,
                      }))}
                    value={selectedTeamMembers}
                    onChange={(event, value) => setSelectedTeamMembers(value)}
                    getOptionLabel={(option) => option.name}
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
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#868dfb",
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
                          borderColor: "#868dfb",
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
                <Box sx={{ mb: 2 }}>
                  <TextField
                    id="Budget"
                    label="Budget"
                    variant="outlined"
                    placeholder="0 ETB"
                    fullWidth
                    value={Budget}
                    onChange={handleBudgetChange}
                    error={!!validationErrors.Budget}
                    helperText={validationErrors.Budget}
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
                          color: validationErrors.EndDate ? "red" : "#868dfb",
                        },
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<AddIcon />}
                  >
                    {editingIndex !== -1 ? "Save" : "Add"}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

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
              <Typography
                variant="h4"
                sx={{ mb: 1 }}
                color={colors.primary[110]}
              >
                {submittedProjects.ProjectName}
              </Typography>
              <Typography variant="body1" sx={{ mt: 4, mb: 1 }}>
                <Typography component="span" color={colors.greenAccent[400]}>
                  {" "}
                  Description:{" "}
                </Typography>{" "}
                {submittedProjects.ProjectDescription}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Typography
                    component="span"
                    color={colors.greenAccent[400]}
                    sx={{ mr: 1 }}
                  >
                    Project Manager:
                  </Typography>
                  <Tooltip
                    title={submittedProjects.projectManager.username}
                    arrow
                  >
                    <Avatar
                      sx={{
                        bgcolor: colors.primary[110],
                        height: "30px",
                        width: "30px",
                        mr: 1,
                        cursor: "pointer", // Add cursor pointer for indicating tooltip
                      }}
                    >
                      {submittedProjects.projectManager.username.charAt(0)}
                    </Avatar>
                  </Tooltip>
                </Box>
              </Typography>
              <Box display="flex" alignItems="center" mt={2}>
                <Typography
                  variant="body1"
                  sx={{ mr: 1, marginBottom: 2 }}
                  color={colors.greenAccent[400]}
                >
                  Team Members:
                </Typography>
                {submittedProjects.teamMembers &&
                  submittedProjects.teamMembers.map((member) => (
                    <Tooltip
                      key={member._id}
                      title={member.name}
                      placement="top"
                    >
                      <Avatar
                        key={member._id}
                        sx={{
                          bgcolor: colors.primary[110],
                          height: "30px",
                          width: "30px",
                          mr: 1,
                          mb: 2,
                          cursor: "pointer",
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
              <Typography variant="body1" sx={{ mb: 1 }}>
                <Typography
                  component="span"
                  color={colors.greenAccent[400]}
                  sx={{ mr: 1 }}
                >
                  Start Date:{" "}
                </Typography>
                {dayjs(submittedProjects?.StartDate).format("YYYY.MM.DD")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <Typography
                  component="span"
                  color={colors.greenAccent[400]}
                  sx={{ mr: 1 }}
                >
                  {" "}
                  End Date:{" "}
                </Typography>{" "}
                {dayjs(submittedProjects?.EndDate).format("YYYY.MM.DD")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <Typography
                  component="span"
                  color={colors.greenAccent[400]}
                  sx={{ mr: 1 }}
                >
                  {" "}
                  Budget:{" "}
                </Typography>
                {submittedProjects.Budget}
              </Typography>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  color="secondary"
                  onClick={() => handleEditProject(0)} // Pass index 0 for editing the single project
                >
                  {submittedProjects?.StartDate &&
                  submittedProjects.EndDate &&
                  submittedProjects.Budget
                    ? "Edit"
                    : "Add"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Project;
