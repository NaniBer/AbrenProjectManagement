import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import Calendar from "../../components/calendar";
import Resource from "../../components/resource";
import Milestone from "../../components/milestone";
import UpdateProjectPM from "../updateprojectPM";
import { loadProject } from "../../Actions/projectActions";

import {
  CheckCircleOutline,
  PeopleAlt,
  FormatListBulleted,
  Dashboard,
  Event,
  BarChart,
  Timeline,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

const App = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState("");

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./ProjectDummy.json"); // Assuming data.json is in the public folder
        const data = await response.json();
        setJsonData(data);
        dispatch(loadProject(data));
      } catch (error) {
        console.error("Error reading JSON file:", error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const isCalendarSelected = selectedItem === "Calendar";
  const isResourceSelected = selectedItem === "Resource";
  const isMilestoneSelected = selectedItem === "Milestone";
  const isEditSelected = selectedItem == "Edit";

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
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                color: isResourceSelected ? "#6870fa" : "inherit",
                textDecoration: isResourceSelected ? "italic" : "none",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("Edit")}
            >
              <EditIcon sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>
                Edit Project Details
              </span>
            </div>
            <div
              style={{ flex: 0.2, textAlign: "center", padding: "2px" }}
              onClick={() => handleItemClick("Task")}
            >
              <CheckCircleOutline sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>Task</span>
            </div>

            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                color: isResourceSelected ? "#6870fa" : "inherit",
                textDecoration: isResourceSelected ? "italic" : "none",
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
                marginLeft: "-2px",
              }}
              onClick={() => handleItemClick("Board")}
            >
              <Dashboard sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>Board</span>
            </div>
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                justifyContent: "flex-start",
                display: "flex",
                alignItems: "center",
                color: isCalendarSelected ? "#6870fa" : "inherit",
                textDecoration: isCalendarSelected ? "italic" : "none",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick("Calendar")}
            >
              <Event sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>
                Calendar
              </span>
            </div>
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                marginLeft: "-2px",
              }}
              onClick={() => handleItemClick("Analytics")}
            >
              <BarChart sx={{ fontSize: 16 }} />
              <span style={{ marginLeft: "2px", fontSize: "14px" }}>
                Analytics
              </span>
            </div>
            <div
              style={{
                flex: 0.2,
                textAlign: "center",
                padding: "2px",
                marginLeft: "-2px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                color: isMilestoneSelected ? "#6870fa" : "inherit",
                textDecoration: isMilestoneSelected ? "italic" : "none",
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
      {isEditSelected && <UpdateProjectPM />}
    </div>
  );
};

export default App;
