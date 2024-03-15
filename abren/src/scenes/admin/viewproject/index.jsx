// Importing necessary components and icons
import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";
import { tokens } from "../../../theme";
import { mockDataProject } from "../../../data/mockData";
import Header from "../../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";

// Main component
const Viewproject = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [projectData, setProjectData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  useEffect(() => {
    fetch("/admin/getProjects")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const fetchedData = data.map((row) => ({
          ...row,
          id: row._id,
          description: row.ProjectDescription,
          projectname: row.ProjectName,
          projectmanager: row.ProjectManager[0].name,
        }));
        // console.log(fetchedData);
        setProjectData(fetchedData);
      });
  }, []);

  // Function to toggle status
  const handleDisable = (rowId) => {
    const updatedProjectData = projectData.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          status: row.status === "Inactive" ? "Active" : "Inactive",
        };
      }
      return row;
    });
    setProjectData(updatedProjectData);
  };

  // Function to delete a row
  const handleDelete = (rowId) => {
    swal({
      title: "Are you sure?",
      text: "You are about to delete this row.",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        fetch(`/admin/deleteProjects/${rowId}`, {
          method: "DELETE",
        }).then((response) => {
          const statusCode = response.status;
          if (statusCode == 200) {
            const updatedProjectData = projectData.filter(
              (row) => row.id !== rowId
            );
            setProjectData(updatedProjectData);
            swal("Deleted!", "The row has been deleted.", "success");
          }
        });
      }
    });
  };

  const checkIfRowIsAssociatedWithData = (rowId) => {
    // Replace this logic with your actual implementation
    // For example, you can check if the row is associated with another data in your state or database
    return false;
  };
  // const handleDelete = (rowId) => {
  //   const isAssociatedWithData = checkIfRowIsAssociatedWithData(rowId);

  //   const confirmationMessage = isAssociatedWithData
  //     ? 'This row is associated with another data. Do you want to disable it?'
  //     : 'You are about to delete this row.';

  //   const buttons = isAssociatedWithData
  //     ? {
  //         cancel: 'Cancel',
  //         delete: 'Delete',
  //         disable: {
  //           text: 'Disable',
  //           value: 'disable',
  //         },
  //       }
  //     : ['Cancel', 'Delete'];

  //   swal({
  //     title: 'Are you sure?',
  //     text: confirmationMessage,
  //     icon: 'warning',
  //     buttons: buttons,
  //     dangerMode: true,
  //   }).then((value) => {
  //     if (value === 'disable') {
  //       // Handle the disable action here
  //     } else if (value === 'delete') {
  //       // Remove the row from teamData and update the state
  //       const updatedProjectData = teamData.filter((row) => row.id !== rowId);
  //       setTeamData(updatedProjectData);
  //       // Close the modal if a row was selected
  //       if (selectedRow && selectedRow.id === rowId) {
  //         setSelectedRow(null);
  //       }
  //       swal('Deleted!', 'The row has been deleted.', 'success');
  //     }
  //   });
  // };

  // Function to open modal for updating a row
  const handleModalOpen = (row) => {
    setSelectedRow(row);
    setProjectName(row.projectname);
    setDescription(row.description);
    setProjectManager(row.projectmanager);
    setSelectedUser(row.projectmanager.name);
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
  };
  const handleUserSelect = (event, value) => {
    setProjectManager(value);
  };

  // Function to update a row
  const handleUpdate = () => {
    const updatedProjectData = projectData.map((row) => {
      if (row.id === selectedRow.id) {
        const id = selectedRow.id;
        console.log(id);
        const formData = {
          id,
          ProjectName: projectName,
          ProjectDescription: description,
          ProjectManager: projectManager,
        };
        console.log(formData);
        fetch(`/admin/updateProjects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).then((response) =>
          response.json().then((data) => console.log(data))
        );
        return {
          ...row,
          projectname: projectName,
          description: description,
          projectmanager: projectManager.name,
        };
      }

      return row;
    });

    setProjectData(updatedProjectData);

    // Close the modal
    setSelectedRow(null);
    setProjectName("");
    setDescription("");
    setProjectManager("");

    swal("Updated!", "The row has been updated.", "success");
  };

  // Columns configuration
  const columns = [
    {
      field: "projectname",
      headerName: "Project Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2.5,
      renderCell: ({ row }) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => swal(row.description)}
        >
          {row.description}
        </div>
      ),
    },
    {
      field: "projectmanager",
      headerName: "Project Manager",
      flex: 1.5,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDisable(row.id)}
          disabled={false}
        >
          {row.status === "Active" ? "Disable" : "Enable"}
        </Button>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "update",
      headerName: "Update",
      flex: 0.5,
      width: 100,
      renderCell: ({ row }) => (
        <Button variant="" color="primary" onClick={() => handleModalOpen(row)}>
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      width: 100,
      renderCell: ({ row }) => (
        <Button variant="" color="primary" onClick={() => handleDelete(row.id)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="View Project" subtitle="Managing the projects" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={projectData}
          columns={columns}
          onCellClick={(params) => {
            const field = params.field;
            if (field === "update") {
              const rowId = params.id;
              handleModalOpen(projectData.find((row) => row.id === rowId));
            }
          }}
          // Add event handler for row double click
          onRowDoubleClick={(params) => {
            const row = params.row;
            swal({
              title: "Row Information",
              // icon: 'info',
              content: {
                element: "div",
                attributes: {
                  innerHTML: `
                    <p style="color: primary;"><strong>Project Name:</strong> ${row.ProjectName}</p>
                    <p style="color: black;"><strong>Description:</strong> ${row.description}</p>
                    <p style="color: black;"><strong>Project Manager:</strong> ${row.projectManager.name}</p>
                    <p style="color: black;"><strong>Status:</strong> ${row.status}</p>
                  `,
                  style: "text-align: left; color: black;", // Set text color to black
                },
              },
              backdrop: "rgba(255,255,255,0.8)", // Lighten the backdrop
            });
          }}
        />
      </Box>
      <Modal
        open={Boolean(selectedRow)}
        onClose={() => setSelectedRow(null)}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            // bgcolor: '#1F2A40',
            backgroundColor: colors.primary[400],
            boxShadow: 24,
            p: 4,
            borderRadius: "20px",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ mb: "20px" }}
          >
            Update Project
          </Typography>
          <TextField
            label="Project Name"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            fullWidth
            margin="normal"
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
          <TextField
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
            margin="normal"
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
          <Box sx={{ mb: 2 }}>
            <Autocomplete
              options={activeUsers} // Set the dropdown options to the usernames array
              getOptionLabel={(option) => `${option.name}`} // Use the username as the label
              value={projectManager}
              onChange={handleUserSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Project Manager"
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

          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "8px" }}
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedRow(null)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Viewproject;
