import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import Header from "../../../components/Header";
import EditIcon from '@mui/icons-material/Edit';
import swal from "sweetalert";


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [teamData, setTeamData] = useState(mockDataTeam);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");

  const handleDisable = (rowId) => {
    const updatedTeamData = teamData.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          status: row.status === "Inactive" ? "Active" : "Inactive",
        };
      }
      return row;
    });
    setTeamData(updatedTeamData);
  };

  const handleUpdate = (rowId) => {
    const selectedRow = teamData.find((row) => row.id === rowId);
    if (selectedRow) {
      setSelectedRow(selectedRow);
      setUpdatedFirstName(selectedRow.firstname);
      setUpdatedLastName(selectedRow.lastname);
      setUpdatedEmail(selectedRow.email);
      setUpdatedUsername(selectedRow.username);
      setOpenModal(true);
    }
  };

  const handleModalSave = () => {
    const updatedTeamData = teamData.map((row) => {
      if (row.id === selectedRow.id) {
        return {
          ...row,
          firstname: updatedFirstName || row.firstname,
          lastname: updatedLastName || row.lastname,
          email: updatedEmail || row.email,
          username: updatedUsername || row.username,
        };
      }
      return row;
    });
    setTeamData(updatedTeamData);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
    setUpdatedFirstName("");
    setUpdatedLastName("");
    setUpdatedEmail("");
    setUpdatedUsername("");
  };

  const columns = [
    {
      field: 'firstname',
      headerName: 'Firstname',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'lastname',
      headerName: 'Lastname',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1.5,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDisable(row.id)}
          disabled={false}
        >
          {row.status === 'Active' ? 'Disable' : 'Enable'}
        </Button>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 120,
      renderCell: ({ row }) => (
        <Button variant="" onClick={() => handleUpdate(row.id)}>
          <EditIcon />
        </Button>
      ),
    }
  ]; 

  return (
    <Box m="20px">
      <Header title="View User" subtitle="Managing the members" />

      <Box m="40px 0 0 0" 
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: 'none',
        },
        "& .MuiDataGrid-cell": {
          borderBottom: 'none',
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: 'none',
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: 'none',
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
          borderRadius: '90%', // Make the checkboxes round
        },
      }}
      >
        <DataGrid
          checkboxSelection
          rows={teamData}
          columns={columns}
          onRowDoubleClick={(params) => {
            const row = params.row;
            swal({
              title: 'Row Information',
               // icon: 'info',
              content: {
                element: 'div',
                attributes: {
                  innerHTML: `
                    <p style="color: primary;"><strong>Firstname:</strong> ${row.firstname}</p>
                    <p style="color: black;"><strong>Lastname:</strong> ${row.lastname}</p>
                    <p style="color: black;"><strong>Email:</strong> ${row.email}</p>
                    <p style="color: black;"><strong>Username:</strong> ${row.username}</p>
                    <p style="color: black;"><strong>Status:</strong> ${row.status}</p>
                  `,
                  style: "text-align: left; color: black;", // Set text color to black
                },
              },
              backdrop: 'rgba(255,255,255,0.8)', // Lighten the backdrop
            });
            // swal({
            //   title: 'Row Information',
            //   text: `
            //     Firstname: ${row.firstname}
            //     Lastname: ${row.lastname}
            //     Email: ${row.email}
            //     Username: ${row.username}
            //     Status: ${row.status}
            //   `,
            //   icon: 'info',
            // });
          }}
          onCellClick={(params) => {
            const field = params.field;
            if (field === "update") {
              const rowId = params.id;
              handleUpdate(rowId);
            }
          }}
        />
      </Box>

      {selectedRow && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              borderRadius: 5,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h2" component="h2" gutterBottom>
              Update User
            </Typography>
            <TextField
              label="First Name"
              value={updatedFirstName}
              onChange={(e) => setUpdatedFirstName(e.target.value)}
              fullWidth
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#868dfb',
                },
              }}
              InputLabelProps={{
                sx: {
                  '&.Mui-focused': {
                    color: '#868dfb',
                  },
                },
              }}
            />
            <TextField
              label="Last Name"
              value={updatedLastName}
              onChange={(e) => setUpdatedLastName(e.target.value)}
              fullWidth
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#868dfb',
                },
              }}
              InputLabelProps={{
                sx: {
                  '&.Mui-focused': {
                    color: '#868dfb',
                  },
                },
              }}
            /> 
            <TextField
              label="Email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              fullWidth
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#868dfb',
                },
              }}
              InputLabelProps={{
                sx: {
                  '&.Mui-focused': {
                    color: '#868dfb',
                  },
                },
              }}
            />
            <TextField
              label="Username"
              value={updatedUsername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
              fullWidth
              margin="normal"
              sx={{
                mb: '25px',
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#868dfb',
                },
              }}
              InputLabelProps={{
                sx: {
                  '&.Mui-focused': {
                    color: '#868dfb',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleModalSave}
              style={{ marginRight: "8px" }}
            >
              Update
            </Button>
            <Button variant="contained" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default Team;
