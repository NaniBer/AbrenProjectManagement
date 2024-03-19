import React from "react";
import { Routes, Route } from "react-router-dom";

import TopbarTM from "../../scenes/global/TopbarTM";
import SidebarTeamMember from "../../scenes/global/sidebarTeamMember";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

import UpdateProgressTask from "../../scenes/teamMember/updateProgressTask";
import ViewAssignedTask from "../../scenes/teamMember/viewAssignedTask";
import ViewAssignedProject from "../../scenes/teamMember/viewAssignedProject";
import Kanban from "../../scenes/teamMember/kanban";
import Dashboard from "../../scenes/teamMember/dashboardTeamMember";
import Update  from "../../scenes/teamMember/updateandreset";






function PmRoute() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          {/* <AdminPage/> */}
          <SidebarTeamMember/>
          <main className="content">
            <TopbarTM />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboardTeamMember" element={<Dashboard />}></Route>
              <Route path="/updateProgressTask" element={<UpdateProgressTask />}></Route>
              <Route  path="/viewAssignedTask" element={<ViewAssignedTask />}/><Route/>
              <Route  path="/viewAssignedProject" element={<ViewAssignedProject />}/><Route/>
              <Route  path="/kanban" element={<Kanban />}/><Route/>
              <Route  path="/updateandreset" element={<Update />}/><Route/>



            </Routes>

            {/* <p>hello</p> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default PmRoute;