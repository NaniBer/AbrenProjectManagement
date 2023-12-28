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

  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    fetch("/admin/getUsers")
      .then((res) => res.json())
      .then((data) => {
        const fetchedData = data.map((row) => ({
          ...row,
          id: row._id,
          status: row.disabled ? "inactive" : "active", // Set the status based on the disabled value
          role: "User",
        }));
        console.log(fetchedData);
        setTeamData(fetchedData);
      });
  }, []);

  //   If a match is found, we create a new object using the spread operator ({ ...row })
  //   to copy all the properties of the current row. We then update the status property of
  //   the new object to 'inactive', indicating that the user is disabled.
  const handleDisable = (rowId) => {
    // the teamData state array is mapped over using the map method. For each row in the teamData,
    //  it checks if the row.id matches the rowId passed as an argument.
    const updatedTeamData = teamData.map((row) => {
      if (row.id === rowId) {
        if (row.status === "inactive") {
          // If there is a match, it checks the current row.status. If the status is "inactive",
          // it creates a new object ({ ...row })
          // using the spread operator to copy all the properties of the current row.
          return { ...row, status: "active" };
        } else {
          return { ...row, status: "inactive" };
        }
      }
      return row;
    });
    setTeamData(updatedTeamData);
  };

  const columns = [
    { field: "id", headerName: "ID" },
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
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="78%"
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
      flex: 1,
      cellClassName: "name-column--cell",
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
        <DataGrid checkboxSelection rows={teamData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
