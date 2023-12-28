import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";

import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [teamData, setTeamData] = useState(mockDataTeam);
  const [selectedRow, setSelectedRow] = useState(null); // Track the selected row for the modal
  const [openModal, setOpenModal] = useState(false); // Control the visibility of the modal
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");

  const handleDisable = (rowId) => {
    // Update the teamData state array
    const updatedTeamData = teamData.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          status: row.status === "inactive" ? "active" : "inactive",
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
      setUpdatedFirstName(selectedRow.firstname); // Pre-fill the firstname value
      setUpdatedLastName(selectedRow.lastname); // Pre-fill the firstname value
      setUpdatedEmail(selectedRow.email); // Pre-fill the email value
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
      swal("Updated!", "The row has been updated.", "success");

      return row;
    });
    setTeamData(updatedTeamData);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
    setUpdatedFirstName(""); // Reset the firstname value
    setUpdatedLastName(""); // Reset the lastname value
    setUpdatedEmail("");
    setUpdatedUsername("");
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "firstname",
      headerName: "Firstname",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastname",
      headerName: "Lastname",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1.5,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="80%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
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
          {row.status === "active" ? "Disable" : "Enable"}
        </Button>
      ),
    },
    {
      field: "update",
      headerName: "Update",
      width: 120,
      renderCell: ({ row }) => (
        <Button variant="" onClick={() => handleUpdate(row.id)}>
          <EditIcon />
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="View User" subtitle="Managing the members" />

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
          rows={teamData}
          columns={columns}
          onCellClick={(params) => {
            const field = params.field;
            if (field === "update") {
              const rowId = params.id;
              handleUpdate(rowId);
            }
          }}
        />
      </Box>

      {/* Modal */}
      {selectedRow && (
        <Modal open={openModal} onClose={handleCloseModal}>
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
              Update User
            </Typography>
            <Typography variant="body1" gutterBottom>
              Selected Row ID: {selectedRow.id}
            </Typography>
            <TextField
              label="First Name"
              value={updatedFirstName}
              onChange={(e) => setUpdatedFirstName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              value={updatedLastName}
              onChange={(e) => setUpdatedLastName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Username"
              value={updatedUsername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleModalSave}
              style={{ marginRight: "8px" }}
            >
              Save
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

// Styles for the DataGrid component

export default Team;
