import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import TimeSelect from "../../TimeSelect";

function SessionPage(props) {
  const id = useParams().id;
  console.log("🚀 ~ file: SessionPage.js:6 ~ SessionPage ~ id:", id);
  return (
    <Box>
      <TimeSelect />
    </Box>
  );
}

export default SessionPage;
