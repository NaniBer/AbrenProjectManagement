import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import ProjectStatusReport from "../../projectManager/report/projectStatusReport";
import ProjectHealthReport from "../../projectManager/report/projectHealthReport";
import ProjectAnalyticsReportUI from "./projectAnalyticsReport";

const Resource = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Projects" subtitle="Manage Projects" />
      <ProjectStatusReport />
      <ProjectHealthReport />
      <ProjectAnalyticsReportUI />
    </Box>
  );
};

export default Resource;
