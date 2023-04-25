import { Box, Container, Snackbar, Typography } from "@mui/material";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./components/Mainpage/MainPage";
import SessionPage from "./components/SessionPage/SessionPage";

// const testModalContents = {
//   title: "안녕하세요",
//   content: "클립보드에 URL 을 복사했습니다!",
// };

function App() {
  return (
    <Router>
      <Container className="App center">
        <Routes>
          <Route path="/:id" element={<SessionPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
