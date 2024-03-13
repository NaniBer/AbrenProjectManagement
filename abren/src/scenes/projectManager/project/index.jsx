import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Calendar from "../../../scenes/projectManager/calendar";
import Resource from "../../../scenes/projectManager/resource";
import Milestone from "../../../scenes/projectManager/milestone";
// import UpdateProjectPM from "../updateprojectPM";
import Analytic from "../../../scenes/projectManager/analytic";
import ProjectAnalytic from "../../../scenes/projectManager/projectAnalytic";
import ProjectInfo from "../../../scenes/projectManager/projectInfo";
import List from "../../../scenes/projectManager/list";

import {
  CheckCircleOutline,
  PeopleAlt,
  FormatListBulleted,
  Event,
  BarChart,
  Timeline,
} from "@mui/icons-material";
// import EditIcon from "@mui/icons-material/Edit";

const App = () => {
  const [selectedItem, setSelectedItem] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("./ProjectDummy.json"); // Assuming data.json is in the public folder
  //       const data = await response.json();
  //       setJsonData(data);
  //       dispatch(loadProject(data));
  //     } catch (error) {
  //       console.error("Error reading JSON file:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const isCalendarSelected = selectedItem === "Calendar";
  const isResourceSelected = selectedItem === "Resource";
  const isMilestoneSelected = selectedItem === "Milestone";
  const isEditSelected = selectedItem === "Edit";
  const isAnalyticSelected = selectedItem === "Analytic";
  const isProjectAnalyticSelected = selectedItem === "ProjectAnalytic";
  const isProjectInfoSelected = selectedItem === "ProjectInfo";
  const isListSelected = selectedItem === "List";

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
              onClick={() => handleItemClick("ProjectInfo")}
            >
              <CheckCircleOutline sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>
                Project Info
              </span>
            </div>

            {/* <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                color: isResourceSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("Edit")}
            >
              <EditIcon sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>
                Edit Project Details
              </span>
            </div> */}
            {/* <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                color: isProjectInfoSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("ProjectInfo")}
            >
              <CheckCircleOutline sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>
                Project Info
              </span>
            </div> */}

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
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>
                Resource
              </span>
            </div>

            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                marginLeft: "-2px",
                color: isListSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("List")}
            >
              <FormatListBulleted sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>List</span>
            </div>
            {/* <div
              style={{ flex: 0.2, textAlign: "center", padding: "2px", marginLeft: "-2px" }}
              onClick={() => handleItemClick("Board")}
            >
              <Dashboard sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>Board</span>
            </div> */}
            {/* <div
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
            </div> */}
           
            {/* <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                color: isCalendarSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("Calendar")}
            >
              <Event sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>
                Calendar
              </span>
            </div> */}
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                marginLeft: "-2px",
                color: isAnalyticSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("Analytic")}
            >
              <BarChart sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>
                Task Analytics
              </span>
            </div>
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                marginLeft: "-2px",
                color: isProjectAnalyticSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("ProjectAnalytic")}
            >
              <BarChart sx={{ fontSize: 16 }} />
              <span
                style={{
                  marginLeft: "2px",
                  fontSize: "14px",
                  color: isProjectAnalyticSelected ? "#6870fa" : "inherit",
                }}
              >
                Project Analytics
              </span>
            </div>
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                marginLeft: "-2px",
                color: isMilestoneSelected ? "#6870fa" : "inherit",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("Milestone")}
            >
              <Timeline sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>
                Milestones
              </span>
            </div>
          </div>
        </Typography>
      </Toolbar>

      {isCalendarSelected && <Calendar />}
      {isResourceSelected && <Resource />}
      {isMilestoneSelected && <Milestone />}
      {isAnalyticSelected && <Analytic />}
      {isProjectAnalyticSelected && <ProjectAnalytic />}
      {isProjectInfoSelected && <ProjectInfo />}
      {isListSelected && <List />}

      {/* {isEditSelected && <UpdateProjectPM />} */}
    </div>
  );
};

export default App;
