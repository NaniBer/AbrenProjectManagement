import React, { useState } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { tokens } from "../../theme";
import Header from "../Header";

const Resource = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [resourceName, setResourceName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState("");
  const [frequency, setFrequency] = useState(0);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedResources, setSubmittedResources] = useState([]);

  const handleResourceNameChange = (e) => {
    setResourceName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  const handleCostChange = (e) => {
    setCost(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new resource object
    const newResource = {
      resourceName,
      category,
      quantity,
      cost,
      frequency,
    };
    let costCategory;

    if (category === "Material") {
      costCategory = "per Item";
    } else if (category === "Work") {
      costCategory = "per unit of time";
    } else if (frequency === 0) {
      costCategory = "one-time";
    }
    const backendResource = {
      ResourceName: resourceName,
      Category: category,
      Quantity: quantity,
      CostCategory: costCategory,
      Cost: cost,
      Frequency: frequency,
    };

    fetch("/Users/addResource", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendResource),
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 201) {
          //Todo list created successfully
          return response.json();
        } else {
          console.log(statusCode);
          throw new Error("Failed to create resouce");
        }
      })
      .then((data) => {
        console.log(data);
      });

    // Update the submitted resources list
    setSubmittedResources((prevResources) => [...prevResources, newResource]);

    // Clear the form fields
    setResourceName("");
    setCategory("");
    setQuantity(0);
    setCost("");
    setFrequency(0);

    console.log(newResource);

    setIsFormOpen(false); // Close the form after submission
  };

  const handleEditResource = (index) => {
    // Retrieve the resource at the specified index
    const resource = submittedResources[index];

    // Set the form fields with the values from the selected resource
    setResourceName(resource.resourceName);
    setCategory(resource.category);
    setQuantity(resource.quantity);
    setCost(resource.cost);
    setFrequency(resource.frequency);

    // Remove the selected resource from the submitted resources list
    setSubmittedResources((prevResources) => {
      const updatedResources = [...prevResources];
      updatedResources.splice(index, 1);
      return updatedResources;
    });

    // Open the form for editing the resource
    setIsFormOpen(true);
  };

  const handleDeleteResource = (index) => {
    setSubmittedResources((prevResources) => {
      const updatedResources = [...prevResources];
      updatedResources.splice(index, 1);
      return updatedResources;
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
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxWidth: 500,
              width: "100%",
              outline: "none",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Add Resource
            </Typography>
            <Typography sx={{ mb: 2 }}>
              If the resource is not rented and is for one-time use, please
              leave the frequency field empty
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="resourceName"
                  label="Resource Name"
                  variant="outlined"
                  fullWidth
                  value={resourceName}
                  onChange={handleResourceNameChange}
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
                <TextField
                  id="category"
                  select
                  label="Category"
                  variant="outlined"
                  fullWidth
                  value={category}
                  onChange={handleCategoryChange}
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
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Material">Material</MenuItem>
                </TextField>
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  id="quantity"
                  label="Quantity"
                  helperText='If the resource type is set to "Work", the quantity represents the number of hours to be Work.'
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
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
                <TextField
                  id="cost"
                  label="Cost"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={cost}
                  onChange={handleCostChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">ETB </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {category === "Work" ? "/hr" : null}
                      </InputAdornment>
                    ),
                  }}
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
                <TextField
                  id="frequency"
                  label="Frequency"
                  variant="outlined"
                  fullWidth
                  helperText="If left at 0, it will be considered a one-time occurrence."
                  type="number"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
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
                    {resource.resourceName}
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
                      {resource.category}
                    </Typography>
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Quantity:{" "}
                    <Typography
                      variant="body1"
                      component="span"
                      color={colors.greenAccent[400]}
                    >
                      {resource.quantity}
                    </Typography>
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Cost:
                    <Typography
                      variant="body1"
                      component="span"
                      color={colors.greenAccent[400]}
                    >
                      {resource.cost}
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
