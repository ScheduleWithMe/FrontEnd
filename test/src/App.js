import { Box } from "@mui/material";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./components/Mainpage/MainPage";
import SessionPage from "./components/SessionPage/SessionPage";

function App() {
  return (
    <Router>
      <Box
        className="App"
        sx={{ width: "100vw", height: "100vh", minWidth: 1600 }}
      >
        <Routes>
          <Route path="/:id" element={<SessionPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
