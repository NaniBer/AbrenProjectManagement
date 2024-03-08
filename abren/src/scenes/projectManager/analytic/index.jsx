import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Card,
  CardContent,
  Avatar,
  Tooltip,
  LinearProgress
} from '@mui/material';
import Header from '../../../components/Header';
import { tokens } from '../../../theme';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Task } from '../../../data/mockData';

const Resource = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [daysLeft, setDaysLeft] = useState({});
  const [progressData, setProgressData] = useState([100, 70]); // Initial progress data

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      const daysLeftArray = Task.map((resource) => {
        const endDate = new Date(resource.endDate);
        const differenceInTime = endDate.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays > 0 ? differenceInDays : 0;
      });
      setDaysLeft(daysLeftArray);
    };

    calculateDaysLeft();
  }, [Task]);

  // Dummy function to update progress data
  const updateProgressData = () => {
    // Simulating new progress data
    const newProgressData = [80, 50]; // Assuming you have new progress data for each task
    setProgressData(newProgressData);
  };

  // Simulating progress data update after some time
  useEffect(() => {
    const interval = setInterval(() => {
      updateProgressData();
    }, 5000); // Update progress data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box m="20px">
      <Header title="Analytics" subtitle="Shows analytics of tasks and projects" />
      <Grid container spacing={2}>
        {Task.map((resource, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ marginTop: '20px', backgroundColor: colors.primary[400], borderRadius: '15px' }}>
              <CardContent sx={{ textAlign: 'left' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h3" color={colors.primary[110]}>
                    {resource.taskList}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mt: 3 }}>
                <Typography variant="body1" component="span" color={colors.greenAccent[400]}>
                  Start Date:{' '}
                  </Typography>
                    {resource.startDate}
                  </Typography>
                <Typography variant="body1">
                <Typography variant="body1" component="span" color={colors.greenAccent[400]}>
                  End Date:{' '}
                  </Typography>
                    {resource.endDate}
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <AccessTimeIcon color="secondary" />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {daysLeft[index]} {daysLeft[index] === 1 ? 'day' : 'days'} left
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="body1" sx={{ mr: 1, marginTop: 2 }} color={colors.greenAccent[400]}>
                    Team Members:
                  </Typography>
                  {resource.teamMembers.map((member) => (
                    <Tooltip key={member.id} title={member.email} placement="top">
                      <Avatar key={member.id} sx={{ bgcolor: colors.primary[110], height: '30px', width: '30px', mr: 1 }}>
                        {`${member.firstname.charAt(0)}${member.lastname.charAt(0)}`}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Box>
                {/* Linear Progress Bar */}
                <Box mt={2}>
                  <LinearProgress
                    variant="determinate"
                    value={progressData[index]} // Set the value dynamically
                    sx={{
                      borderRadius: '10px', // Adjust border radius
                      backgroundColor: colors.grey[500], // Change background color
                      '& .MuiLinearProgress-bar': {
                        borderRadius: '15px', // Adjust border radius for the bar
                        backgroundColor: colors.greenAccent[400], // Change progress bar color
                      },
                    }}
                  />
                  <Typography variant="body2" align="right">{`${progressData[index]}%`}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Resource;
