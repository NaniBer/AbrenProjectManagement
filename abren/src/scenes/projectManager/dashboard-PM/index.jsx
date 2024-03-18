import React, { useRef } from "react";
import {
  Box,
  Button,
  useTheme,
  Typography,
  Grid,
} from "@mui/material";
import { tokens } from "../../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import Header from "../../../components/Header";
import StatBox from "../../../components/StatBox";
import {  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart } from "recharts";
import { PieChart, Pie } from "recharts";
import { DashboardPMdata } from '../../../data/mockData';
import { dummyProjectData } from '../../../data/mockData';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Calendar from  "../../projectManager/calendar";
import HealthReport from "../../projectManager/report/projectHealthReport";
import BudgetChartContainer from '../../projectManager/report/projectHealthReport';
import { mockUpdatedDataProject, dummyMilestones, dummyResources } from '../../../data/mockData';


const DashboardPM = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const chartRef = useRef();

  const handleDownloadPdf = (chartType) => {
    const chartNode = chartType === "line" ? document.querySelector(".recharts-wrapper") : chartRef.current;
  
    html2canvas(chartNode, { scrollY: -window.scrollY })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save(`${chartType}_${new Date().toISOString().split("T")[0]}.pdf`);
        
      });
  };
  

  // Transform data to count tasks for each status category on each date
  const taskStatusData = DashboardPMdata.reduce((acc, task) => {
    const dateKey = task.dueDate.toISOString().split("T")[0];
    if (!acc[dateKey]) {
      acc[dateKey] = { date: dateKey, "Not Started": 0, "In Progress": 0, "Completed": 0 };
    }
    acc[dateKey][task.status] += 1;
    return acc;
  }, {});

  // Convert taskStatusData object to an array for Recharts
  const chartData = Object.values(taskStatusData);

  // Count the number of projects
  const numProjects = dummyProjectData.length;
  // Process dummy data to get counts for each status
  const statusCounts = DashboardPMdata.reduce((acc, cur) => {
    acc[cur.status] = (acc[cur.status] || 0) + 1;
    return acc;
  }, {});

  // Calculate task priority counts
  const priorityCounts = DashboardPMdata.reduce((acc, cur) => {
    acc[cur.priority] = (acc[cur.priority] || 0) + 1;
    return acc;
  }, {});

  // Define a function to map priorities to colors
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#FF5733'; // Red
      case 'medium':
        return '#FFD700'; // Yellow
      case 'low':
        return colors.greenAccent[500]; // Green
      default:
        return '#000000'; // Default color
    }
  };

  // Use the function to set the fill color in your data
  const dataPie = Object.keys(priorityCounts).map((priority) => ({
    name: priority,
    value: priorityCounts[priority],
    fill: getPriorityColor(priority),
  }));

  // Prepare data for the BarChart
  const data = [
    { name: 'To Do', value: statusCounts["Not Started"] || 0, fill: colors.redAccent[500] },
    { name: 'In Progress', value: statusCounts["In Progress"] || 0, fill: colors.blueAccent[500] },
    { name: 'Completed', value: statusCounts["Completed"] || 0, fill: colors.greenAccent[500] },
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          {/* <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button> */}
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
        >
          <StatBox
            title={statusCounts["Not Started"] || 0}
            subtitle="To Do"
            icon={
              <ChecklistIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"

        >
          <StatBox
            title={statusCounts["In Progress"] || 0}
            subtitle="In Progress"
            icon={
              <RotateRightIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"

        >
          <StatBox
            title={statusCounts["Completed"] || 0}
            subtitle="Completed"
            icon={
              <AddTaskIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"

        >
          <StatBox
            title={numProjects}
            subtitle="Assigned Projects"
            icon={
              <AccountTreeOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Recharts Bar Chart */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          margin="0"
          backgroundColor={colors.primary[400]}
          borderRadius='15px'
          sx={{ height: '100px' }} // Adjust height to fill the available space
          width="700px"  // Adjust width to fill the available space
        >
        <BudgetChartContainer
            projects={mockUpdatedDataProject}
            milestones={dummyMilestones}
            resources={dummyResources}
            isDashboard={true} // Set isDashboard prop to true
          />
        </Box>



        {/* Pie Chart: Task Completion Trends Over Time */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius='15px'
          height='300px'
          mb="1"
        >
          <Box
            mb={1}
            mt={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pl={2}
            pr={2}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", color: colors.primary[110] }}>
            Task Priority Overview
            </Typography>
            <Button onClick={() => handleDownloadPdf("pie")} variant="" color="primary">
              <DownloadOutlinedIcon />
              {/* Download Pie Chart as PDF */}
            </Button>
          </Box>

          <Box ref={chartRef}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dataPie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill={colors.grey[500]}
                  label={({ name, value }) => `${name}: ${value}`}
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>

     
        </Box>
        {/* <Box
          gridColumn="span 12"
          gridRow="span 4"
          margin="0"
          backgroundColor={colors.primary[400]}
          borderRadius='15px'
          // sx={{ height: '100px' }} // Adjust height to fill the available space
          width="700px"  // Adjust width to fill the available space
        >        
        <Typography variant="h6">Calendar</Typography>
        <Calendar height="90px"  />
        </Box> */}
      </Box>
    </Box>
  );
};

export default DashboardPM;
