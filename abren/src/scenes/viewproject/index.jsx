import React, { useState } from 'react';
import { Box, useTheme, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import swal from 'sweetalert';
import { tokens } from '../../theme';
import { mockDataProject } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const Viewproject = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
    const [teamData, setTeamData] = useState(mockDataProject);

  const handleDelete = (rowId) => {
    swal({
      title: 'Are you sure?',
      text: 'You are about to delete this row.',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        const updatedTeamData = teamData.filter((row) => row.id !== rowId);
        setTeamData(updatedTeamData);
        swal('Deleted!', 'The row has been deleted.', 'success');
      }
    });
  };

 
  const handleUpdate = (rowId) => {
    swal({
      title: 'Are you sure?',
      text: 'You are about to update this row.',
      icon: 'warning',
      buttons: ['Cancel', 'Update'],
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        navigate(`/updateproject/${rowId}`);
      }
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'projectname',
      headerName: 'Project name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'projectmanager',
      headerName: 'Project manager',
      flex: 1.5,
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 120,
      renderCell: ({ row }) => (
        <Button variant="contained" color="primary" onClick={() => handleUpdate(row.id)}>
          Update
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      renderCell: ({ row }) => (
        <Button variant="contained" color="primary" onClick={() => handleDelete(row.id)}>
          Delete
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
          },
        }}
      >
        <DataGrid checkboxSelection rows={teamData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Viewproject;