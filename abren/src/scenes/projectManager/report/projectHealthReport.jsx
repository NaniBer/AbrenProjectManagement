import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import { tokens } from '../../../theme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Resource = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Dummy project data
  const projectData = {
    projectName: "Dummy Project",
    manager: "John Doe",
    reportDate: "2024-03-10",
  };

  // Dummy project health summary data
  const projectHealthSummary = {
    scheduleAdherence: {
      status: 'On Track',
      details: 'The project is currently adhering to the planned schedule. All milestones have been achieved on time.',
    },
    budgetCompliance: {
      status: 'Under Budget',
      details: 'The project\'s actual expenditure is below the approved budget. Cost-saving measures have been implemented effectively.',
    },
    qualityMeasures: {
      status: 'Meeting Expectations',
      details: 'Quality control measures have been implemented rigorously, resulting in high-quality deliverables and minimal defects.',
    },
  };

  // Dummy data for schedule performance
  const schedulePerformanceData = [
    { milestone: 'Design Phase', plannedDate: '2024-03-15', actualDate: '2024-01-20', status: 'Completed' },
    { milestone: 'Development Phase', plannedDate: '2024-02-28', actualDate: '2024-03-05', status: 'Completed' },
    { milestone: 'Testing Phase', plannedDate: '2024-04-15', actualDate: '2024-04-18', status: 'Completed' },
    { milestone: 'Deployment Phase', plannedDate: '2024-05-30', actualDate: '2024-06-05', status: 'In Progress' },
  ];

  // Dummy data for budget performance
  const budgetPerformanceData = [
    { category: 'Work', plannedAmount: 50000, actualAmount: 52000, costOverrun: 2000 },
    { category: 'Material', plannedAmount: 20000, actualAmount: 25000, costOverrun: 5000 },
    { category: 'Equipment', plannedAmount: 10000, actualAmount: 11000, costOverrun: 1000 },
    { category: 'Miscellaneous', plannedAmount: 5000, actualAmount: 6000, costOverrun: 1000 },
  ];

  // Dummy project resource data
  const projectResources = [
    {
      resourceName: 'Software Developer',
      category: 'Work',
      cost: 5000, // per month
      quantity: 3,
    },
    {
      resourceName: 'Graphic Designer',
      category: 'Material',
      cost: 4000, // per month
      quantity: 2,
    },
    {
      resourceName: 'Server Hosting',
      category: 'Cost',
      cost: 1000, // per month
      quantity: 2,
    },
    {
      resourceName: 'Software Licenses',
      category: 'Material',
      cost: 2000, // per year
      quantity: 1,
    },
  ];

  // Aggregate the resources by category and calculate total cost
  const resourceCategories = {};
  projectResources.forEach(resource => {
    const { category, cost, quantity } = resource;
    if (!resourceCategories[category]) {
      resourceCategories[category] = 0;
    }
    resourceCategories[category] += cost * quantity;
  });

  // Map categories to respective colors
  const categoryColors = {
    Work: colors.blueAccent[400],
    Material: colors.greenAccent[400],
    Cost: colors.redAccent[400],
  };

  // Convert aggregated data to array
  const adjustedResourceData = Object.entries(resourceCategories).map(([category, cost]) => ({
    category,
    cost,
    fill: categoryColors[category],
  }));

  // Adjusting legend items to match the correct categories
  const legendItems = Object.keys(categoryColors).map(category => ({
    value: category,
    type: 'square',
    color: categoryColors[category],
  }));

  return (
    <Accordion sx={{ backgroundColor: colors.primary[400], borderRadius: '15px', marginTop: '40px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Accordion sx={{ backgroundColor: colors.primary[400] }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h4">Project Overview</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CardContent sx={{ textAlign: 'left' }}>
                <Typography variant="h4" sx={{ mb: 3, mt: 2 }}>
                  <Typography
                    variant="h3"
                    component="span"
                    sx={{ mr: 1, color: colors.primary[110] }}
                  >
                    Project Name:{' '}
                  </Typography>
                  {projectData.projectName}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}>Manager:</Typography>{projectData.manager}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}>Report Date:</Typography>{projectData.reportDate}
                </Typography>

                {/* Display Project Health Summary */}
                <Typography variant="h5" sx={{ mb: 2, color: colors.primary[110] }}>Project Health Summary</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}>Schedule Adherence:</Typography>{projectHealthSummary.scheduleAdherence.status}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  {projectHealthSummary.scheduleAdherence.details}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}>Budget Compliance:</Typography>{projectHealthSummary.budgetCompliance.status}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  {projectHealthSummary.budgetCompliance.details}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  <Typography component="span" color={colors.greenAccent[400]} sx={{ mr: 1 }}>Quality Measures:</Typography>{projectHealthSummary.qualityMeasures.status}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  {projectHealthSummary.qualityMeasures.details}
                </Typography>

                {/* Display Schedule Performance */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card sx={{ marginTop: '20px', backgroundColor: colors.primary[400], borderRadius: '15px' }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>Schedule Performance</Typography>
                        <BarChart width={400} height={300} data={schedulePerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="milestone" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="actualDate" fill={colors.blueAccent[400]} name="Actual Date" />
                          <Bar dataKey="plannedDate" fill={colors.greenAccent[400]} name="Planned Date" />
                        </BarChart>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    {/* Display Budget Performance */}
                    <Card sx={{ marginTop: '20px', backgroundColor: colors.primary[400], borderRadius: '15px' }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>Budget Performance</Typography>
                        <BarChart width={400} height={300} data={budgetPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="plannedAmount" fill={colors.blueAccent[400]} name="Planned Amount" />
                          <Bar dataKey="actualAmount" fill={colors.greenAccent[400]} name="Actual Amount" />
                          <Bar dataKey="costOverrun" fill={colors.redAccent[400]} name="Cost Overrun" />
                        </BarChart>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Display Resource Management */}
                <Typography variant="h5" sx={{ mb: 2, color: colors.primary[110] }}>Resource Management</Typography>
                <Card sx={{ marginTop: '20px', backgroundColor: colors.primary[400], borderRadius: '15px' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Resource Cost by Category</Typography>
                    <BarChart width={400} height={300} data={adjustedResourceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend payload={legendItems} />
                      <Bar dataKey="cost" fill={colors.blueAccent[400]} />
                    </BarChart>
                  </CardContent>
                </Card>
              </CardContent>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Accordion>
  );
};

export default Resource;
