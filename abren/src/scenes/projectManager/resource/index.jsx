import React, { useEffect, useState } from "react";
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
  InputAdornment,
} from "@mui/material";
import * as Yup from "yup";
import swal from "sweetalert";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { tokens } from "../../../theme";
import { useSelector, useDispatch } from "react-redux";
import {
  editResource,
  addResource,
  deleteResource,
} from "../../../Actions/projectActions";

import Header from "../../../components/Header";

const Resource = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const projectId = useSelector((state) => state.project.project._id);
  const budget = useSelector((state) => state.project.project.Budget);
  const resources = useSelector((state) => state.project.project.resources);
  const dispatch = useDispatch();

  const [ResourceName, setResourceName] = useState("");
  const [Category, setCategory] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [Cost, setCost] = useState("");
  const [Frequency, setFrequency] = useState(0);
  const [edit, setEdit] = useState(false);
  const [editedResource, setEditedResource] = useState();
  const [errors, setErrors] = useState({});

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedResources, setSubmittedResources] = useState([]);

  useEffect(() => {
    setSubmittedResources(resources);
  }, [resources]);
  const handleResourceNameChange = (e) => {
    setResourceName(e.target.value);
  };
  const handleResourceNameBlur = () => {
    // Remove trailing whitespace when input field loses focus
    setResourceName((prevValue) => prevValue.trim());
  };

  const validationSchema = Yup.object().shape({
    ResourceName: Yup.string().trim().required("Resource Name is required"),
    Category: Yup.string().required("Category is required"),
    Quantity: Yup.number()
      .positive("Quantity must be a positive number")
      .required("Quantity is required"),
    Cost: Yup.number()
      .positive("Cost must be a positive number")
      .required("Cost is required"),
    Frequency: Yup.number()
      .min(0, "Frequency must be a non-negative number")
      .required("Frequency is required"),
  });

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  const handleCostChange = (e) => {
    setCost(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        {
          ResourceName,
          Category,
          Quantity,
          Cost,
          Frequency,
        },
        { abortEarly: false }
      );

      // Calculate total cost
      let totalCost;
      if (Frequency === 0) {
        totalCost = Quantity * Cost;
      } else {
        totalCost = Quantity * Cost * Frequency;
      }

      // Check if total cost exceeds budget
      if (totalCost >= budget) {
        // Show error message for exceeding budget
        swal("Error!", "Total cost exceeds budget", "error");
        return; // Exit function early
      }

      let CostCategory;

      if (Category === "Material") {
        CostCategory = "per Item";
      } else if (Category === "Work") {
        CostCategory = "per unit of time";
      } else if (Frequency === 0) {
        CostCategory = "one-time";
      }

      const backendResource = {
        ResourceName,
        Category,
        projectId,
        Quantity,
        CostCategory,
        Cost,
        Frequency,
      };

      const isDuplicate = submittedResources.some(
        (resource) => resource.ResourceName === ResourceName
      );

      if (isDuplicate) {
        // Show error message for duplicate name
        swal("Error!", "Resource name already exists", "error");
      } else {
        // Show loading modal
        swal({
          title: "Please wait...",
          text: edit ? "Updating resource" : "Adding resource",
          buttons: false,
          closeOnEsc: false,
          closeOnClickOutside: false,
          icon: "info",
        });

        if (edit) {
          // Editing an existing resource
          try {
            const response = await fetch(
              `/Users/updateResource/${editedResource._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(backendResource),
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Clear the form fields
            setResourceName("");
            setCategory("");
            setQuantity(0);
            setCost("");
            setFrequency(0);
            setIsFormOpen(false);

            setErrors({});

            // Update submitted resources
            setSubmittedResources((prevResources) => [
              ...prevResources,
              backendResource,
            ]);

            dispatch(editResource(data.updatedResource));

            // Close loading modal
            swal.close();

            // Show success message
            swal("Success!", "Resource updated successfully", "success");
          } catch (error) {
            console.error("Error updating resource:", error);
            // Close loading modal
            swal.close();
          }
        } else {
          // Creating a new resource
          try {
            const response = await fetch("/Users/addResource", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(backendResource),
            });
            if (response.status === 201) {
              const data = await response.json();
              backendResource._id = data.resource._id;
              backendResource.TotalCost = data.resource.TotalCost;
              // Update submitted resources
              setSubmittedResources((prevResources) => [
                ...prevResources,
                backendResource,
              ]);
              dispatch(addResource(data.resource));
              // Clear the form fields
              setResourceName("");
              setCategory("");
              setQuantity(0);
              setCost("");
              setFrequency(0);
              setIsFormOpen(false);
              // Close loading modal
              swal.close();
              // Show success message
              swal("Success!", "Resource added successfully", "success");
            } else {
              throw new Error("Failed to create resource");
            }
          } catch (error) {
            console.error("Error creating resource:", error);
            // Close loading modal
            swal.close();
          }
        }
      }
    } catch (error) {
      // If validation fails, display errors and update form state
      const validationErrors = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      // Update state to show validation errors
      setErrors(validationErrors);
    }
  };

  const handleEditResource = (index) => {
    // Retrieve the resource at the specified index
    const resource = submittedResources[index];

    // Set the form fields with the values from the selected resource
    setResourceName(resource.ResourceName);
    setCategory(resource.Category);
    setQuantity(resource.Quantity);
    setCost(resource.Cost);

    // Remove the selected resource from the submitted resources list
    setSubmittedResources((prevResources) => {
      const updatedResources = [...prevResources];
      updatedResources.splice(index, 1);
      return updatedResources;
    });

    // Open the form for editing the resource
    setIsFormOpen(true);
    setEditedResource(resource);
    setEdit(true);
  };

  const handleDeleteResource = async (index) => {
    console.log(submittedResources[index]);

    // Show loading modal
    swal({
      title: "Please wait...",
      text: "Deleting resource",
      buttons: false,
      closeOnEsc: false,
      closeOnClickOutside: false,
      icon: "info",
    });

    swal({
      title: "Are you sure?",
      text: `You are about to delete the resource labeled ${submittedResources[index].ResourceName}`,
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        setSubmittedResources((prevResources) => {
          const updatedResources = [...prevResources];
          const resourceId = updatedResources[index]._id;
          const performResourceDeletion = async () => {
            try {
              const response = await fetch(
                `/Users/deleteResource/${resourceId}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              // Resource successfully deleted, update state and display success message
              const data = await response.json();
              dispatch(deleteResource(resourceId)); // Assuming deleteResource is your action creator

              // Close loading modal
              swal.close();

              swal("Deleted!", "The row has been deleted.", "success");

              // Remove the resource from the updated resources list
              updatedResources.splice(index, 1);
              return updatedResources;
            } catch (error) {
              console.error("Error deleting resource:", error);
              // Handle error if necessary
              swal.close(); // Close loading modal
              return prevResources; // Return the previous state in case of error
            }
          };

          performResourceDeletion();

          // Return the previous state before the resource is actually deleted
          return prevResources;
        });
      } else {
        // Close loading modal if user cancels deletion
        swal.close();
      }
    });
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Resource" subtitle="Manages the resources we have" />
        <Button
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: colors.primary[400],
            color: theme.palette.common.white,
            fontSize: "12px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={() => setIsFormOpen(true)}
        >
          Add Resource
        </Button>
      </Box>

      {isFormOpen && (
        <Modal open={isFormOpen} onClose={() => setIsFormOpen(false)}>
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
              height: "85%",
              width: "100%",
              outline: "none",
              overflow: "auto",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Add Resource
            </Typography>
            <Typography sx={{ mb: 2 }}>
              If the resource is not rented and is for one-time use, please
              leave the Frequency field empty
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="ResourceName"
                  label="Resource Name"
                  variant="outlined"
                  fullWidth
                  value={ResourceName}
                  onChange={handleResourceNameChange}
                  onBlur={handleResourceNameBlur}
                  error={!!errors.ResourceName}
                  helperText={
                    errors.ResourceName
                      ? errors.ResourceName
                      : "Enter the name of the resource"
                  }
                  sx={{
                    borderColor: errors.ResourceName ? "red" : "#868dfb",
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: errors.ResourceName ? "red" : "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: errors.ResourceName ? "red" : "#868dfb",
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  id="Category"
                  select
                  label="Category"
                  variant="outlined"
                  fullWidth
                  value={Category}
                  onChange={handleCategoryChange}
                  error={!!errors.Category}
                  helperText={
                    errors.Category
                      ? "Category is required."
                      : "Select the category of the resource from the dropdown."
                  }
                  sx={{
                    borderColor: errors.Category ? "red" : "#868dfb",
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: errors.Category ? "red" : "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: errors.Category ? "red" : "#868dfb",
                      },
                    },
                  }}
                >
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Material">Material</MenuItem>
                </TextField>
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  id="Quantity"
                  label="Quantity"
                  // helperText='If the resource type is set to "Work", the Quantity represents the number of hours to be Work.'
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={Quantity}
                  error={!!errors.Quantity}
                  helperText={
                    errors.Quantity
                      ? "Quantity must be a positive number."
                      : "Enter the quantity of the resource. Must be a positive number."
                  }
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  sx={{
                    borderColor: errors.Quantity ? "red" : "#868dfb",
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: errors.Quantity ? "red" : "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: errors.Quantity ? "red" : "#868dfb",
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="Cost"
                  label="Cost"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={Cost}
                  onChange={handleCostChange}
                  error={!!errors.Cost}
                  helperText={
                    errors.Cost
                      ? "Cost must be a positive number."
                      : "Enter the cost of the resource. Must be a positive number."
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">ETB </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {Category === "Work" ? "/period" : null}
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    borderColor: errors.Cost ? "red" : "#868dfb",
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: errors.Cost ? "red" : "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: errors.Cost ? "red" : "#868dfb",
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  id="Frequency"
                  label="Frequency"
                  variant="outlined"
                  fullWidth
                  // helperText="If left at 0, it will be considered a one-time occurrence."
                  type="number"
                  value={Frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  error={!!errors.Frequency}
                  helperText={
                    errors.Frequency
                      ? "Frequency must be a non-negative number."
                      : "Enter the frequency of the resource. Must be a non-negative number."
                  }
                  sx={{
                    borderColor: errors.Frequency ? "red" : "#868dfb",
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: errors.Frequency ? "red" : "#868dfb",
                      },
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: errors.Frequency ? "red" : "#868dfb",
                      },
                    },
                  }}
                />
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  onClick={() => {
                    // Clear all fields
                    setResourceName("");
                    setCategory("");
                    setQuantity(0);
                    setCost("");
                    setFrequency(0);
                    // Reset error color
                    setErrors({});
                  }}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.common.white,
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  Cancel
                </Button>
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

      {submittedResources.length > 0 && (
        <Box mt={4}>
          {/* <Typography variant="h5" component="h3" mb={2}>
            Submitted Resources
          </Typography> */}
          {submittedResources.map((resource, index) => (
            <Accordion style={{ backgroundColor: "#1F2A40" }} key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">
                  Resource Name:{" "}
                  <Typography
                    variant="h4"
                    component="span"
                    color={colors.greenAccent[400]}
                  >
                    {resource.ResourceName}
                  </Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column" width="100%">
                  <Typography variant="body1" gutterBottom>
                    Category:{" "}
                    <Typography
                      variant="body1"
                      component="span"
                      color={colors.greenAccent[400]}
                    >
                      {resource.Category}
                    </Typography>
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Quantity:{" "}
                    <Typography
                      variant="body1"
                      component="span"
                      color={colors.greenAccent[400]}
                    >
                      {resource.Quantity}
                    </Typography>
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Cost:
                    <Typography
                      variant="body1"
                      component="span"
                      color={colors.greenAccent[400]}
                    >
                      {resource.Cost} ETB {resource.CostCategory}
                    </Typography>
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Rate:
                    <Typography
                      variant="body1"
                      component="span"
                      color={colors.greenAccent[400]}
                    >
                      {resource.Frequency}
                    </Typography>
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Total Cost:
                    <Typography
                      variant="body1"
                      component="span"
                      color={colors.greenAccent[400]}
                    >
                      {resource.TotalCost} ETB
                    </Typography>
                  </Typography>

                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <IconButton
                      color="secondary"
                      onClick={() => handleEditResource(index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteResource(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Resource;
