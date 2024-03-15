import React from "react";
import { Routes, Route } from "react-router-dom";

import TopbarTM from "../../scenes/global/TopbarTM";
import SidebarTeamMember from "../../scenes/global/sidebarTeamMember";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

import UpdateProgressTask from "../../scenes/teamMember/updateProgressTask";
import ViewAssignedTask from "../../scenes/teamMember/viewAssignedTask";
import ViewAssignedProject from "../../scenes/teamMember/viewAssignedProject";

import Dashboard from "../../scenes/teamMember/dashboardTeamMember";
import Update from "../../scenes/teamMember/updateandreset";
import TopbarPM from "../../scenes/global/TopbarPM";
import SidebarProjectManager from "../../scenes/global/SidebarProjectManager";
// import DashboardPM from "../../scenes/projectManager/dashboard-PM";
import Calendar from "../../scenes/projectManager/calendar";
import Kanban from "../../scenes/projectManager/kanbanPM";
import Project from "../../scenes/projectManager/project";
import Resource from "../../scenes/projectManager/resource";
import List from "../../scenes/projectManager/list";
import Milestone from "../../scenes/projectManager/milestone";
import ProjectInfo from "../../scenes/projectManager/projectInfo";
import Analytic from "../../scenes/projectManager/analytic";
import ProjectAnalytic from "../../scenes/projectManager/projectAnalytic";
import Report from "../../scenes/projectManager/report";
import ProjectStatus from "../../scenes/projectManager/report/projectStatusReport";
import ProjectHealth from "../../scenes/projectManager/report/projectHealthReport";

function UserRoute() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          {/* <AdminPage/> */}
          <SidebarProjectManager />
          <main className="content">
            <TopbarTM />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/dashboardTeamMember"
                element={<Dashboard />}
              ></Route>
              <Route
                path="/updateProgressTask"
                element={<UpdateProgressTask />}
              ></Route>
              <Route path="/viewAssignedTask" element={<ViewAssignedTask />} />
              <Route />
              <Route
                path="/viewAssignedProject"
                element={<ViewAssignedProject />}
              />
              <Route />
              <Route path="/kanban" element={<Kanban />} />
              <Route />
              <Route path="/updateandreset" element={<Update />} />
              <Route />
              <Route path="/calendar" element={<Calendar />}></Route>
              <Route path="/kanban" element={<Kanban />}></Route>
              <Route path="/project" element={<Project />}></Route>
              <Route path="/resource" element={<Resource />}></Route>
              <Route path="/list" element={<List />}></Route>
              <Route path="/milestone" element={<Milestone />}></Route>
              <Route path="/analytic" element={<Analytic />}></Route>
              <Route path="/projectInfo" element={<ProjectInfo />}></Route>
              <Route
                path="/projectAnalytic"
                element={<ProjectAnalytic />}
              ></Route>
              <Route path="/report" element={<Report />}></Route>
              <Route
                path="/projectStatusReport"
                element={<ProjectStatus />}
              ></Route>
              <Route
                path="/projectHealthReport"
                element={<ProjectHealth />}
              ></Route>
              <Route path="/updateandreset" element={<Update />}></Route>
            </Routes>

            {/* <p>hello</p> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default UserRoute;
