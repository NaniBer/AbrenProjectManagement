import React from "react";
import { Routes, Route } from "react-router-dom";

import Topbar from "../../scenes/global/Topbar";
import SidebarProjectManager from "../../scenes/global/SidebarProjectManager";
import Calendar from "../../scenes/projectManager/calendar";
import Kanban from "../../scenes/projectManager/kanban";
import Project from "../../scenes/projectManager/project";
import Resource from "../../scenes/projectManager/resource";
import List from "../../scenes/projectManager/list";
import Milestone from "../../scenes/projectManager/milestone";
import ProjectInfo from "../../scenes/projectManager/projectInfo";
import Analytic from "../../scenes/projectManager/analytic";
import ProjectAnalytic from "../../scenes/projectManager/projectAnalytic";
import Report from "../../scenes/projectManager/report";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

function PmRoute() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          {/* <AdminPage/> */}
          <SidebarProjectManager/>
          <main className="content">
            <Topbar />
            <Routes>
              {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
              <Route path="/calendar" element={<Calendar />}></Route>
              <Route path="/kanban" element={<Kanban />}></Route>
              <Route path="/project" element={<Project />}></Route>
              <Route path="/resource" element={<Resource />}></Route>
              <Route path="/list" element={<List />}></Route>
              <Route path="/milestone" element={<Milestone/>}></Route>
              <Route path="/analytic" element={<Analytic/>}></Route>
              <Route path="/projectInfo" element={<ProjectInfo/>}></Route>
              <Route path="/projectAnalytic" element={<ProjectAnalytic/>}></Route>
              <Route path="/report" element={<Report/>}></Route>
            </Routes>

            {/* <p>hello</p> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default PmRoute;
