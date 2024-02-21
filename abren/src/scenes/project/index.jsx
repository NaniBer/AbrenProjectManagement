import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Calendar from "../../components/calendar";
import Resource from "../../components/resource";
import List from "../../components/list";
import Milestone from "../../components/milestone";
import ProjectInfo from "../../components/projectInfo";
import Analytic from "../../components/analytic";
import ProjectAnalytic from "../../components/projectAnalytic";
// import Kanban from "../..components/kanban";

import {
  CheckCircleOutline,
  PeopleAlt,
  FormatListBulleted,
  Dashboard,
  Event,
  BarChart,
  Timeline,
} from "@mui/icons-material";

const Project = () => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const isCalendarSelected = selectedItem === "Calendar";
  const isResourceSelected = selectedItem === "Resource";
  const isListSelected = selectedItem === "List";
  const isMilestoneSelected = selectedItem === "Milestone";
  const isProjectInfoSelected = selectedItem === "projectInfo";
  const isAnalyticSelected = selectedItem === "Analytic";
  const isProjectAnalyticSelected = selectedItem === "projectAnalytic";

  return (
    <div>
      <AppBar position="static">
        {/* <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Horizontal Bar
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Toolbar sx={{ padding: "2px", margin: "0 -8px" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <div style={{ display: "flex" }}>
            
            <div
              style={{ 
                flex: 0.2, 
                textAlign: "center", 
                padding: "2px",
                color: isProjectInfoSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("projectInfo")}
            >
              <CheckCircleOutline sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>Project Info</span>
            </div>
            
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                color: isResourceSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("Resource")}
            >
              <PeopleAlt sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>Resource</span>
            </div>
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                color: isListSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("List")}
            >
              <FormatListBulleted sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>List</span>
            </div>
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                // color: isListSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("List")}
            >
              <Dashboard sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>Kanban</span>
            </div>
            <div
              style={{ flex: 0.2, textAlign: "center", padding: "2px", color: isCalendarSelected ? "#6870fa" : "inherit", cursor: "pointer" }}
              onClick={() => handleItemClick("Calendar")}
            >
              <Event sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>Calendar</span>
            </div>
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                color: isAnalyticSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("Analytic")}
            >
              <BarChart sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>Task Analytics</span>
            </div>
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                color: isProjectAnalyticSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("projectAnalytic")}
            >
              <BarChart sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>Project Analytics</span>
            </div>
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                color: isMilestoneSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("Milestone")}
            >
              <Timeline sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>Milestones</span>
            </div>
          </div>
        </Typography>
      </Toolbar>

      {isCalendarSelected && <Calendar />}
      {isResourceSelected && <Resource />}
      {isListSelected && <List />}
      {isMilestoneSelected && <Milestone />}
      {isProjectInfoSelected && <ProjectInfo />}
      {isAnalyticSelected && <Analytic />}
      {isProjectAnalyticSelected && <ProjectAnalytic />}
    </div>
  );
};

export default Project;
