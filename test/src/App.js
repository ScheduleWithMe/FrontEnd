import { Box, Typography } from "@mui/material";
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
        <Typography position="absolute" sx={{ p: 2 }}>
          Made by{" "}
          <span style={{ fontWeight: 1000, color: "#1269AE" }}>TEAM 8</span>
        </Typography>
        <Routes>
          <Route path="/FrontEnd" element={<MainPage />} />
          <Route path="/FrontEnd/:id" element={<SessionPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
