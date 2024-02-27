import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import Header from '../Header';
import { tokens } from '../../theme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import ExpandMore icon
import {  LineChart, Line,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Import Recharts components
import { projectData } from '../../data/mockData'; // Importing the dummy data

const Resource = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Dummy data for the Budget vs. Actual chart
  const budgetVsActualData = [
    { category: 'Category 1', planned: 5000, actual: 6000 },
    { category: 'Category 2', planned: 8000, actual: 7500 },
    { category: 'Category 3', planned: 3000, actual: 4000 },
    { category: 'Category 4', planned: 6000, actual: 5500 },
    { category: 'Category 5', planned: 6000, actual: 5500 },
    { category: 'Category 6', planned: 6000, actual: 5500 },
    // Add more data as needed
  ];

  const scheduleStatusData = [
    { date: '2022-09-01', completed: 20, inProgress: 50, notStarted: 30 },
    { date: '2022-09-02', completed: 25, inProgress: 45, notStarted: 30 },
    { date: '2022-09-03', completed: 30, inProgress: 40, notStarted: 30 },
    // Add more data as needed
  ];


  return (
    <Box m="20px">
      <Header title="Projects" subtitle="Manage Projects" />
      <Accordion sx={{backgroundColor: colors.primary[400]}}>

      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Accordion sx={{backgroundColor: colors.primary[400]}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h4">Project Status Report</Typography>
            </AccordionSummary>
            <AccordionDetails>
          {/* Your existing card */}
          {/* <Card sx={{ marginTop: '20px', backgroundColor: colors.primary[400], borderRadius: '15px' }}> */}
            <CardContent sx={{ textAlign: 'left' }}>
              {/* Content of your existing card */}
              <Typography variant="h4" sx={{ mb: 3 , mt:2}}>
                <Typography variant="h3" component="span" color={colors.primary[110]} sx={{ mr: 1 }}>Project Name:{' '} </Typography>{projectData.projectName}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 , mt:2}}>
                <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}>Report Date:{' '} </Typography>{projectData.reportDate}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 , mt:2}}>
                <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}>Current Status:{' '}{' '} </Typography>{projectData.currentStatus}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 , mt:2}}>
                <Typography component="span" color={colors.greenAccent[400]} sx={{ mr:1}}>
                  Project Overview: 
                </Typography>
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
            </CardContent>
          {/* </Card> */}
          </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={6}>
          {/* Budget vs. Actual Chart */}
          <Card sx={{ marginTop: '20px',backgroundColor: colors.primary[400], borderRadius: '15px' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Budget vs. Actual</Typography>
              <BarChart
                width={500}
                height={250}
                data={budgetVsActualData}
                margin={{ top: 20, right: 35, left: 2, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="planned" fill={colors.blueAccent[400]} name="Planned Budget" />
                <Bar dataKey="actual" fill={colors.redAccent[400]} name="Actual Expenditure" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
        <Card
            sx={{
              marginTop: '20px',
              backgroundColor: colors.primary[400],
              borderRadius: '15px',
            }}
          >
            <CardContent sx={{ textAlign: 'left' }}>
              {/* <Typography variant="h4" sx={{ mb: 3, mt: 2 }}>
                Project Schedule Status
              </Typography> */}
              <Typography variant="h6" sx={{ mb: 2 }}>Project Schedule Status</Typography>

              <LineChart
                width={480}
                height={250}
                data={scheduleStatusData}
                margin={{ top: 20, right: 35, left: 2, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke={colors.greenAccent[400]}
                  name="Completed"
                />
                <Line
                  type="monotone"
                  dataKey="inProgress"
                  stroke={colors.blueAccent[400]}
                  name="In Progress"
                />
                <Line
                  type="monotone"
                  dataKey="notStarted"
                  stroke={colors.redAccent[400]}
                  name="Not Started"
                />
              </LineChart>
            </CardContent>
          </Card>
       </Grid>

      </Grid>
      </Accordion>
    </Box>
  );
};

export default Resource;
