import React, { useState } from 'react';
import { Box, useTheme, Button, Modal, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import swal from 'sweetalert';
import { tokens } from '../../theme';
import { mockDataProject } from '../../data/mockData';
// import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Viewproject = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const navigate = useNavigate();
  const [teamData, setTeamData] = useState(mockDataProject);
  const [selectedRow, setSelectedRow] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [projectManager, setProjectManager] = useState('');

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

  
  const handleModalOpen = (row) => {
    setSelectedRow(row);
    setProjectName(row.projectname);
    setDescription(row.description);
    setProjectManager(row.projectmanager);
  };

  const handleUpdate = () => {
    // Perform the update action using the selectedRow.id and the updated values
    const updatedTeamData = teamData.map((row) => {
      if (row.id === selectedRow.id) {
        return {
          ...row,
          projectname: projectName,
          description: description,
          projectmanager: projectManager,
        };
      }
      return row;
    });

    setTeamData(updatedTeamData);

    // Close the modal
    setSelectedRow(null);
    setProjectName('');
    setDescription('');
    setProjectManager('');

    swal('Updated!', 'The row has been updated.', 'success');
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
  flex: 1.5,
  renderCell: ({ row }) => (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => swal(row.description)}
    >
      {row.description}
    </div>
  ),
},
    {
      field: 'projectmanager',
      headerName: 'Project manager',
      flex: 1,
    },
    {
      field: 'update',
      headerName: 'Update',
      flex: 0.5,
      width: 100,
      renderCell: ({ row }) => (
        <Button variant="" color="primary" onClick={() => handleModalOpen(row)}>
                    <EditIcon />

        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.5,
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
        <DataGrid
          checkboxSelection
          rows={teamData}
          columns={columns}
          onCellClick={(params) => {
            const field = params.field;
            if (field === "update") {
              const rowId = params.id;
              handleModalOpen(teamData.find(row => row.id === rowId));
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
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
          <TextField
            label="Project Manager"
            value={projectManager}
            onChange={(event) => setProjectManager(event.target.value)}
            fullWidth
            margin="normal"
          />
          <Button 
          variant="contained" 
          color="primary"
          style={{ marginRight: "8px" }}
          onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="contained" color="primary" onClick={() => setSelectedRow(null)}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Viewproject;



