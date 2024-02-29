// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/adminpage";
import PmRoute from "./pages/ProjectManagerRoute";
import Form from "./scenes/form/form";
import Login from "./scenes/form/login";

function App() {
  return (
    <Routes>
      {/* <Route path="/*" element={<PmRoute />} /> */}

      <Route path="/login" element={<Login />} />

      <Route path="/form" element={<Form />}></Route>

      <Route path="/admin/*" element={<AdminPage />} />

      <Route path="/pm/*" element={<PmRoute />} />
    </Routes>
  );
}

export default App;
