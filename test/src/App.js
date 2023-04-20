import { Box, Typography } from "@mui/material";
import "./App.css";
import UserButton from "./modules/UserButton";

function App() {
  return (
    <div className="App">
      <Box>
        <UserButton />
        <Typography>☝️클릭하시면 됩니당</Typography>
      </Box>
    </div>
  );
}

export default App;
