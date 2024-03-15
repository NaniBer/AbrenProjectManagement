import React, { useEffect, useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import Autocomplete from "@mui/material/Autocomplete";
import { mockDataTeam } from "../../../data/mockData";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";
import { tokens } from "../../../theme";

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedUser, setSelectedUser] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/Users/activeUsers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to retrieve active users");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the retrieved active users data
        console.log(data);

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
  }, []);

  const handleFormSubmit = (values, formik) => {
    const { projectname, description } = values;
    const formData = {
      ProjectName: projectname,
      ProjectDescription: description,
      ProjectManager: selectedUser,
    };

    if (values.projectname && values.description && selectedUser) {
      fetch("/admin/CreateProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((response) => {
        if (response.ok) {
          Swal("Successful!", "You have created a new project!", "success", {
            button: "Ok!",
          });
        }
        navigate("admin/viewproject");
      });

      formik.setSubmitting(false); // Set submitting to false after successful submission
    }
  };

  const handleUserSelect = (event, value) => {
    setSelectedUser(value);
  };

  // const handleCreateProject = (event) => {
  //   event.preventDefault();

  // }
  const checkoutSchema = yup.object().shape({
    projectname: yup.string().required("Required"),
    description: yup.string().required("Required"),
  });

  const validate = (values) => {
    const errors = {};

    if (!selectedUser) {
      errors.projectmanager = "Please select a project manager";
    }

    return errors;
  };

  return (
    <Box m="20px">
      <Header title="CREATE PROJECT" subtitle="Create a New Project" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validate={validate}
        validationSchema={checkoutSchema}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Project Name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.projectname}
                name="projectname"
                error={
                  formik.touched.projectname && !!formik.errors.projectname
                }
                helperText={
                  (formik.touched.projectname && formik.errors.projectname) ||
                  "Please enter a clear and concise name for the project you intend to create."
                }
                className="form-field"
                sx={{
                  backgroundColor: colors.primary[400],
                  gridColumn: "span 4",
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

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                name="description"
                error={
                  formik.touched.description && !!formik.errors.description
                }
                helperText={
                  (formik.touched.description && formik.errors.description) ||
                  "Please enter a detailed description for the project you intend to create."
                }
                className="form-field"
                sx={{
                  backgroundColor: colors.primary[400],
                  gridColumn: "span 4",
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
              <Box gridColumn="span 4">
                {" "}
                {/* Spanning 4 columns */}
                <Autocomplete
                  options={activeUsers} // Set the dropdown options to the usernames array
                  getOptionLabel={(option) => `${option.name}`} // Use the username as the label
                  value={selectedUser}
                  onChange={handleUserSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Project Manager"
                      error={
                        formik.touched.projectmanager &&
                        !!formik.errors.projectmanager
                      }
                      helperText={
                        (formik.touched.projectmanager &&
                          formik.errors.projectmanager) ||
                        "Please select the project manager for the project you intend to create."
                      }
                      fullWidth
                      variant="filled"
                      sx={{
                        gridColumn: "span 4",
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
                  )}
                  className="form-field"
                  gridColumn="span 4" // Spanning 4 columns
                />
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={handleFormSubmit}
              >
                Create New Project
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* {selectedUser && (
        <Box mt="40px">
          <Typography variant="h6">Chosen Project Manager:</Typography>
          <Typography>{selectedUser}</Typography>
        </Box>
      )} */}
    </Box>
  );
};

const initialValues = {
  projectname: "",
  description: "",
  projectmanager: "",
};

export default Form;
