import React, { useState } from 'react';
import {
  Box,
  Button,
  useTheme,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Resource = () => {
  const theme = useTheme();

  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedTeams, setSubmittedTeams] = useState([]);

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleMemberChange = (e) => {
    setSelectedMember(e.target.value);
  };

  const addMember = () => {
    if (selectedMember && !selectedMembers.includes(selectedMember)) {
      setSelectedMembers((prevMembers) => [...prevMembers, selectedMember]);
    }
  };

  const removeMember = (email) => {
    setSelectedMembers((prevMembers) =>
      prevMembers.filter((member) => member !== email)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new team object
    const newTeam = {
      teamName,
      description,
      members: selectedMembers,
    };

    // Update the submitted teams list
    setSubmittedTeams((prevTeams) => [...prevTeams, newTeam]);

    // Clear the form fields
    setTeamName('');
    setDescription('');
    setSelectedMember('');
    setSelectedMembers([]);

    setIsFormOpen(false); // Close the form after submission
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component="h2">
          TEAM
        </Typography>

        <Button
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
          }}
          onClick={() => setIsFormOpen(true)}
        >
          Add Team
        </Button>
      </Box>

      {isFormOpen && (
        <Modal open={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              maxWidth: 500,
              width: '100%',
              outline: 'none',
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Add Team
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="teamName"
                  label="Team Name"
                  variant="outlined"
                  fullWidth
                  value={teamName}
                  onChange={handleTeamNameChange}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  fullWidth
                  rows={4}
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="member-label">Members</InputLabel>
                  <Select
                    id="member"
                    labelId="member-label"
                    value={selectedMember}
                    onChange={handleMemberChange}
                  >
                    {/* Replace this with your own data source */}
                    <MenuItem value="member1@example.com">
                      member1@example.com
                    </MenuItem>
                    <MenuItem value="member2@example.com">
                      member2@example.com
                    </MenuItem>
                    <MenuItem value="member3@example.com">
                      member3@example.com
                    </MenuItem>
                  </Select>
                </FormControl>
                <IconButton onClick={addMember}>
                  <AddIcon />
                </IconButton>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">Selected Members:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedMembers.map((member) => (
                    <Chip
                      key={member}
                      label={member}
                      onDelete={() => removeMember(member)}
                    />
                  ))}
                </Box>
              </Box>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      )}

<Box display="flex">
      <Box mt={4}>
        {submittedTeams.map((team, index) => (
          <Box
            key={index}
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: '4px',
              p: 2,
              mb: 2,
            }}
          >
            <Typography variant="h6">{team.teamName}</Typography>
            <Box border="25px">
            <Typography variant="body1">{team.description}</Typography>
            </Box>
            <Typography variant="body1">
              Members: {team.members.join(', ')}
            </Typography>
          </Box>
        ))}
      </Box>
      </Box>
    </Box>
  );
};

export default Resource;