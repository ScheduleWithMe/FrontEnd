import * as React from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import LoginModule from "./LoginModule";
import RegistModule from "./RegistModule";

function UserButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton className="user-Button" onClick={handleClick}>
        <AccountBox fontSize="large" />
      </IconButton>
      <Menu
        id="user"
        className="useAccountMenu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem id="login">{LoginModule(handleClose)}</MenuItem>
        <MenuItem>{RegistModule(handleClose)}</MenuItem>
      </Menu>
    </Box>
  );
}

export default UserButton;
