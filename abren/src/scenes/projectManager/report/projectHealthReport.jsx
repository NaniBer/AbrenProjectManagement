import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
  Typography,
  useTheme,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { tokens } from '../../../theme';

const BudgetChart = ({ project, milestones, resources, projects, selectedProjectId, handleChange }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Function to calculate total used budget for the selected project
  const calculateUsedBudget = () => {
    let totalUsedBudget = 0;
    milestones.forEach((milestone) => {
      if (milestone.projectId === project.id) {
        const resource = resources.find((res) => res.name === milestone.resource);
        if (resource) {
          totalUsedBudget += milestone.quantity * resource.rate;
        }
      }
    });
    return totalUsedBudget;
  };

  // Data for the chart
  const data = [
    {
      name: 'Allocated Budget',
      budget: project.budget,
      fill: colors.primary[110], // Allocated Budget Color
    },
    {
      name: 'Used Budget',
      budget: calculateUsedBudget(),
      fill: colors.greenAccent[400], // Used Budget Color
    },
  ];

  // Calculate total budget used percentage
  const totalUsedPercentage = ((data[1].budget / data[0].budget) * 100).toFixed(2);

  return (
    <Card sx={{ marginTop: '20px', backgroundColor: colors.primary[400], borderRadius: '15px', position: 'relative' }}>
      <CardContent>
        <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
          <FormControl sx={{ m: 1, mt:2, mr:2 }}>
            <InputLabel id="project-select-label">Select Project</InputLabel>
            
            <Select
              labelId="project-select-label"
              id="project-select"
              value={selectedProjectId}
              onChange={handleChange}
            >
              {projects.map((proj) => (
                <MenuItem key={proj.id} value={proj.id}>{proj.projectname}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h3" sx={{ mb: 2 ,ml:2, mt:2}}>Budget Chart - <Typography variant='h4' component= "span" sx={{color: colors.primary[110]}}>{project.projectname}</Typography></Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 ,ml:2}}>Date: {new Date().toLocaleDateString()}</Typography>
        <BarChart width={800} height={400} data={data} margin={{ top: 20, right: 20, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Budget (ETB)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: '20px' }} // Adjust padding as needed
          />
          <Bar dataKey="budget" name="Budget" fill={colors.primary[110]} />
        </BarChart>
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.primary[300], padding: '10px', borderRadius: '0 0 15px 15px' }}>
          <Typography variant="h6" sx={{ color: colors.grey[100] }}>Summary</Typography>
          <Typography variant="body1" sx={{ color: colors.grey[100] }}>Allocated Budget: {data[0].budget} ETB</Typography>
          <Typography variant="body1" sx={{ color: colors.grey[100] }}>Used Budget: {data[1].budget} ETB ({totalUsedPercentage}%)</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const BudgetChartContainer = ({ projects, milestones, resources }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);

  const handleChange = (event) => {
    setSelectedProjectId(event.target.value);
  };

  const selectedProject = projects.find((project) => project.id === selectedProjectId);

  return (
    <div>
      {selectedProject && (
        <BudgetChart
          project={selectedProject}
          milestones={milestones}
          resources={resources}
          projects={projects}
          selectedProjectId={selectedProjectId}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

// Dummy data
const mockUpdatedDataProject = [
  {
    id: 1,
    projectname: "Kaizen website",
    description: "kaizen is a tech company ",
    projectmanager: "saronbisrat.kaizen",
    status: "active",
    startDate: '2024-03-12',
    endDate: '2024-03-13',
    budget: 5000,
  },
  {
    id: 2,
    projectname: "New website",
    description: "kaizen is a tech company ",
    projectmanager: "saronbisrat.kaizen",
    status: "active",
    startDate: '2024-03-12',
    endDate: '2024-03-12',
    budget: 3000,
  },
];

const dummyMilestones = [
  {
    name: 'Milestone 1',
    description: 'Complete phase 1 of the project',
    allocatedBudget: 2000,
    status: 'In Progress',
    priority: 'High',
    resource: 'Resource 1',
    quantity: 10,
    projectId: 1,
  },
  {
    name: 'Milestone 2',
    description: 'Procure necessary materials',
    allocatedBudget: 1000,
    status: 'Pending',
    priority: 'Medium',
    resource: 'Resource 2',
    quantity: 20,
    projectId: 1,
  },
  {
    name: 'Milestone 3',
    description: 'Finalize project documentation',
    allocatedBudget: 1500,
    status: 'Completed',
    priority: 'Low',
    resource: 'Resource 3',
    quantity: 15,
    projectId: 2,
  },
];

const dummyResources = [
  {
    name: 'Resource 1',
    category: 'work',
    quantity: 10,
    cost: 0,
    rate: 50,
  },
  {
    name: 'Resource 2',
    category: 'material',
    quantity: 20,
    cost: 0,
    rate: 10,
  },
  {
    name: 'Resource 3',
    category: 'work',
    quantity: 15,
    cost: 0,
    rate: 60,
  },
];

export default function App() {
  return (
    <div>
      <BudgetChartContainer projects={mockUpdatedDataProject} milestones={dummyMilestones} resources={dummyResources} />
    </div>
  );
}
