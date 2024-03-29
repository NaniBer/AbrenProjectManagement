import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./scenes/form/form";
import Login from "./scenes/form/login";
// import Dashboard from "./scenes/dashboard";
import DashboardAdmin from "./scenes/dashboard-admin";
import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
import SidebarAdmin from "./scenes/global/SidebarAdmin";
import Createproject from "./scenes/createproject";
import Createteamaccount from "./scenes/createteamaccount";
import Calendar from "./scenes/calendar";
import Kanban from "./scenes/kanban";
import Team from "./scenes/team";
import Updateuser from "./scenes/updateuser";
import Updateproject from "./scenes/updateproject";
import Viewuser from "./scenes/viewuser";
import Viewproject from "./scenes/viewproject";
import Reset from "./scenes/updateandreset";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <SidebarAdmin />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<DashboardAdmin />}></Route>
              <Route path="/form" element={<Form />}></Route>
              <Route path="/calendar" element={<Calendar />}></Route>
              <Route path="/kanban" element={<Kanban />}></Route>
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

              {/* <Route
                path="/createteamaccount"
                element={<Createteamaccount />}
              ></Route> */}
              <Route path="/login" element={<Login />} />
            </Routes>

            {/* <p>hello</p> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
