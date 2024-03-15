import React, { useState, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
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
  IconButton,
} from "@mui/material";
import { SaveAlt } from "@mui/icons-material"; // Import download icon
import { tokens } from "../../../theme";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas'; // Import html2canvas

// Dummy data
const projects = [
  {
    id: 1,
    name: "Project A",
    startDate: "2024-02-21",
    endDate: "2024-02-28",
    teamMembers: [
      { id: 1, firstname: "John", lastname: "Doe", email: "john@example.com" },
      { id: 2, firstname: "Jane", lastname: "Doe", email: "jane@example.com" },
    ],
    tasks: [
      { id: 1, name: "Task 1", progress: 80 },
      { id: 2, name: "Task 2", progress: 50 },
      { id: 3, name: "Task 3", progress: 100 },
      { id: 4, name: "Task 4", progress: 80 },
      { id: 5, name: "Task 5", progress: 20 },
      { id: 6, name: "Task 6", progress: 10 },
      { id: 7, name: "Task 7", progress: 70 },
      { id: 8, name: "Task 8", progress: 40 },
      { id: 9, name: "Task 9", progress: 50 },
    ],
  },
  {
    id: 2,
    name: "Project B",
    startDate: "2024-03-01",
    endDate: "2024-03-07",
    teamMembers: [
      {
        id: 3,
        firstname: "Alice",
        lastname: "Smith",
        email: "alice@example.com",
      },
      { id: 4, firstname: "Bob", lastname: "Smith", email: "bob@example.com" },
    ],
    tasks: [
      { id: 4, name: "Task 1", progress: 60 },
      { id: 5, name: "Task 2", progress: 30 },
      { id: 6, name: "Task 3", progress: 90 },
    ],
  },
  {
    id: 3,
    name: "Project C",
    startDate: "2024-03-06",
    endDate: "2024-03-12",
    teamMembers: [
      {
        id: 3,
        firstname: "Alice",
        lastname: "Smith",
        email: "alice@example.com",
      },
      { id: 4, firstname: "Bob", lastname: "Smith", email: "bob@example.com" },
    ],
    tasks: [
      { id: 7, name: "Task 1", progress: 70 },
      { id: 8, name: "Task 2", progress: 100 },
      { id: 9, name: "Task 3", progress: 90 },
    ],
  },
];

function calculateProjectProgress(project) {
  const totalTasks = project.tasks.length;
  const totalProgress = project.tasks.reduce(
    (acc, task) => acc + task.progress,
    0
  );
  return totalProgress / totalTasks;
}

const ProgressReport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const chartRef = useRef(null);

  const handleChangeProject = (event) => {
    const projectId = parseInt(event.target.value);
    const project = projects.find((proj) => proj.id === projectId);
    setSelectedProject(project);
  };

  const projectOptions = projects.map((project) => (
    <MenuItem key={project.id} value={project.id}>
      {project.name}
    </MenuItem>
  ));

  const projectProgress = calculateProjectProgress(selectedProject);

  const handleDownloadPDF = () => {
    // html2canvas(chartRef.current).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF();
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = pdf.internal.pageSize.getHeight();
    //   const imgWidth = pdfWidth * 0.9; // Adjust the image width as needed
    //   const imgHeight = (imgWidth * canvas.height) / canvas.width;
    //   const xPos = (pdfWidth - imgWidth) / 2;
    //   const yPos = (pdfHeight - imgHeight) / 2;
    //   pdf.text(`Progress Report: ${selectedProject.name}`, 10, 10);
    //   pdf.text(`Start Date: ${selectedProject.startDate}`, 10, 20);
    //   pdf.text(`End Date: ${selectedProject.endDate}`, 10, 30);
    //   pdf.text(`Progress: ${projectProgress.toFixed(2)}%`, 10, 40);
    //   pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);
    //   pdf.save(`progress_report_${selectedProject.name}.pdf`);
    // });
  };

  return (
    <div>
      <Card
        sx={{
          marginTop: "20px",
          backgroundColor: colors.primary[400],
          borderRadius: "15px",
          position: "relative",
        }}
      >
        <CardContent>
          <Typography variant="h3" sx={{ mb: 2, ml: 2, mt: 2 }}>
            Progress Report:
            <Typography
              variant="h4"
              component="span"
              sx={{ color: colors.primary[110] }}
            >
              {" "}
              {selectedProject.name}
            </Typography>
          </Typography>
          <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}>
            <FormControl sx={{ m: 1, mt: 2, mr: 2 }}>
              <InputLabel id="project-select-label">Select Project</InputLabel>
              <Select
                labelId="project-select-label"
                id="project-select"
                value={selectedProject.id}
                label="Select Project"
                onChange={handleChangeProject}
              >
                {projectOptions}
              </Select>
            </FormControl>
            <IconButton
              onClick={handleDownloadPDF}
              color="primary"
              aria-label="download pdf"
            >
              <SaveAlt sx={{ mt: 3, color: "white", fontSize: "28px" }} />
            </IconButton>
          </Box>
          <div ref={chartRef}>
            <BarChart
              width={800}
              height={400}
              data={selectedProject.tasks}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "Progress (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#8884d8" />
            </BarChart>
          </div>
          <Box
            sx={{
              position: "relative",
              backgroundColor: colors.primary[300],
              padding: "10px",
              borderRadius: "0 0 15px 15px",
            }}
          >
            <Typography variant="h6" sx={{ color: colors.grey[100] }}>
              Summary
            </Typography>
            <Typography variant="body1" sx={{ color: colors.grey[100] }}>
              Start Date: {selectedProject.startDate}
            </Typography>
            <Typography variant="body1" sx={{ color: colors.grey[100] }}>
              End Date: {selectedProject.endDate}
            </Typography>
            <Typography variant="body1" sx={{ color: colors.grey[100] }}>
              Progress: {projectProgress.toFixed(2)}%
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressReport;
