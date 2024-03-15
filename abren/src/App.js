// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/adminPage";
import PmRoute from "./pages/ProjectManagerRoute";
import TmRoute from "./pages/teamMemberRoute";
import Form from "./scenes/form/form";
import Login from "./scenes/form/login";
import UserRoute from "./pages/userRoute";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<TmRoute />} />

      <Route path="/pm/*" element={<PmRoute />} />

      <Route path="/login" element={<Login />} />

      <Route path="/form" element={<Form />}></Route>

      <Route path="/admin/*" element={<AdminPage />} />

      <Route path="/team/*" element={<TmRoute />} />

      <Route path="/pm/*" element={<PmRoute />} />
      <Route path="/user/*" element={<UserRoute />} />
    </Routes>
  );
}

export default App;
