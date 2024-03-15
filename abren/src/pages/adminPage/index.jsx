import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "../../scenes/dashboard-admin";
import TopbarAdmin from "../../scenes/global/TopbarAdmin";
import SidebarAdmin from "../../scenes/global/SidebarAdmin";
import Createproject from "../../scenes/admin/createproject";
import Createteamaccount from "../../scenes/admin/createteamaccount";
import Team from "../../scenes/team";
import Viewuser from "../../scenes/admin/viewuser";
import Viewproject from "../../scenes/admin/viewproject";
import Updateuser from "../../scenes/updateuser";
import Updateproject from "../../scenes/updateproject";
import Reset from "../../scenes/admin/updateandreset";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

function AdminPage() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <SidebarAdmin />
          <main className="content">
            <TopbarAdmin />
            <Routes>
              <Route path="/" element={<DashboardAdmin />}></Route>
              <Route path="/team" element={<Team />}></Route>
              <Route path="/viewuser" element={<Viewuser />}></Route>
              <Route path="/viewproject" element={<Viewproject />}></Route>
              <Route path="/createproject" element={<Createproject />}></Route>
              <Route
                path="/createteamaccount"
                element={<Createteamaccount />}
              ></Route>
              <Route path="/updateuser/:id" element={<Updateuser />}></Route>
              <Route
                path="/updateproject/:rowId"
                element={<Updateproject />}
              ></Route>
              <Route path="/updateandreset" element={<Reset />}></Route>

              {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
            {/* <p>hello</p> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AdminPage;
