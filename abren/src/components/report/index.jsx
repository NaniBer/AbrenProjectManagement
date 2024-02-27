import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import Header from '../Header';
import { tokens } from '../../theme';
// import { PieChart } from '@mui/x-charts/PieChart';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { projectData } from '../../data/mockData'; // Importing the dummy data

const Resource = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const [daysLeft, setDaysLeft] = useState([]);
  const [progressData, setProgressData] = useState([]);

  // useEffect(() => {
  //   const calculateDaysLeft = () => {
  //     const today = new Date();
  //     const endDate = new Date(projectData.reportDate);
  //     const differenceInTime = endDate.getTime() - today.getTime();
  //     const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  //     setDaysLeft(differenceInDays > 0 ? differenceInDays : 0);
  //   };

  //   calculateDaysLeft();
  // }, []);

  useEffect(() => {
    const calculateProgressData = () => {
      const totalProgress = 70; // Assuming overall project progress
      setProgressData(totalProgress);
    };

    calculateProgressData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Projects" subtitle="Manage Projects" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ marginTop: '20px', backgroundColor: colors.primary[400], borderRadius: '15px' }}>
            <CardContent sx={{ textAlign: 'left' }}>
            <Typography variant="h4" sx={{ mb: 3 , mt:2}}>
                <Typography variant="h3" component="span" color={colors.primary[110]} sx={{ mr: 1 }}>Project Name:{' '} </Typography>{projectData.projectName}
                </Typography>

              <Typography variant="body1" sx={{ mb: 1 , mt:2}}>
                <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}>Report Date:{' '} </Typography>{projectData.reportDate}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 , mt:2}}>
                <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}>Current Status:{' '}{' '} </Typography>                  {projectData.currentStatus}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 , mt:2}}>
                 <Typography component="span" color={colors.greenAccent[400]} sx={{ mr:1}}>
                Project Overview: </Typography>
                {projectData.projectOverview}
                 </Typography>

            <Typography variant="body1" sx={{ mb: 1 , mt:2}}>
                 <Typography component="span" color={colors.greenAccent[400]} sx={{ mr:1}}>
                Milestones Achieved:
                </Typography>
              </Typography>
              <ul>
                {projectData.milestones.map((milestone, index) => (
                  <li key={index}>{milestone}</li>
                ))}
              </ul>
              <Typography variant="body1" sx={{ mb: 1 , mt:2}}>
                 <Typography component="span" color={colors.greenAccent[400]} sx={{ mr:1}}>
                Resource Allocation:
              </Typography>
              </Typography>
              <ul>
                <li>Team Members:
                  <ul>
                    {projectData.resourceAllocation.teamMembers.map((member) => (
                      <li key={member.id}>{member.name} - {member.role}</li>
                    ))}
                  </ul>
                </li>
                <li>Budget: {projectData.resourceAllocation.budget}</li>
                <li>Timeline: {projectData.resourceAllocation.timeline}</li>
                <li>Technology: {projectData.resourceAllocation.technology}</li>
                <li>Equipment: {projectData.resourceAllocation.equipment}</li>
                <li>Training: {projectData.resourceAllocation.training}</li>
                <li>Other Resources: {projectData.resourceAllocation.otherResources}</li>
              </ul>
              <Typography variant="body1" sx={{ mb: 1 , mt:2}}>
                 <Typography component="span" color={colors.greenAccent[400]} sx={{ mr:1}}>
                Next Steps and Action Items:
              </Typography>
              </Typography>
              <ul>
                {projectData.nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
                {projectData.actionItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              {/* <Box display="flex" alignItems="center" mt={2}>
                <AccessTimeIcon color="secondary" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                </Typography>
              </Box> */}
              <Box mt={2}>
                <LinearProgress
                  variant="determinate"
                  value={progressData}
                  sx={{
                    borderRadius: '10px',
                    backgroundColor: colors.grey[500],
                    '& .MuiLinearProgress-bar': {
                      borderRadius: '15px',
                      backgroundColor: colors.greenAccent[400],
                    },
                  }}
                />
                <Typography variant="body2" align="right">{`${progressData}% Complete`}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid>
      {/* <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    /> */}
      </Grid>
    </Box>
  );
};

export default Resource;