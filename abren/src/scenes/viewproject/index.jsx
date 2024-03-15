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
import { tokens } from "../../theme";
// import { mockDataProject } from "../../data/mockData";
// import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik } from "formik";

const Viewproject = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    fetch("/admin/getProjects")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const fetchedData = data.map((row) => ({
          ...row,
          id: row._id,
          description: row.ProjectDescription,
          projectname: row.ProjectName,
          projectmanager: row.ProjectManager.name,
        }));
        // console.log(fetchedData);
        setProjectData(fetchedData);
      });
  }, []);
  const handleUserSelect = (event, value) => {
    setProjectManager(value);
  };

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

  const handleModalOpen = async (row) => {
    await fetch("/admin/getUsernames")
      .then((response) => response.json())
      .then((data) => {
        const usernames = data.map((item) => item.username);
        setUsernames(usernames);
      });
    setSelectedRow(row);
    setProjectName(row.projectname);
    setDescription(row.description);
    setProjectManager(row.projectmanager);
  };

  const handleUpdate = () => {
    // Perform the update action using the selectedRow.id and the updated values
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
        fetch(`/admin/updateProjects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        return {
          ...row,
          projectname: projectName,
          description: description,
          projectmanager: projectManager,
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

    // swal("Updated!", "The row has been updated.", "success");
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "projectname",
      headerName: "Project name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
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
      headerName: "Project manager",
      flex: 1,
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
      flex: 0.5,
      width: 100,
      renderCell: ({ row }) => (
        <Button variant="" color="primary" onClick={() => handleDelete(row.id)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];
  const validate = (values) => {
    const errors = {};

    if (!projectManager) {
      errors.projectmanager = "Please select a project manager";
    }

    return errors;
  };

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
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h2" component="h2" gutterBottom>
            Update Project
          </Typography>
          <Typography variant="body1" gutterBottom>
            Selected Row ID: {selectedRow && selectedRow.id}
          </Typography>
          <Formik validate={validate}>
            {(formik) => (
              <form>
                <TextField
                  label="Project Name"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Autocomplete
                  options={usernames} // Set the dropdown options to the usernames array
                  getOptionLabel={(option) => option} // Use the username as the label
                  value={projectManager}
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
                        formik.touched.projectmanager &&
                        formik.errors.projectmanager
                      }
                      fullWidth
                      variant="filled"
                      margin="normal"
                    />
                  )}
                  className="form-field"
                  gridColumn="span 4" // Spanning 4 columns
                />
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
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
};

export default Viewproject;
