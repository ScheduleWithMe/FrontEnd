import { Login } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import isEmail from "validator/lib/isEmail";
import React from "react";
const LoginModule = (CloseMenu) => {
  const [DialogOpen, setDialog] = React.useState(false);
  const [Validate, setValidate] = React.useState(false);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");

  const keyDownTab = (event) => {
    event.stopPropagation();
  };
  const keyDownEnter = (event) => {
    handleSubmit();
  };
  const eventMap = {
    Tab: keyDownTab,
    Enter: keyDownEnter,
  };

  const KeydownEvent = (event) => {
    eventMap[event.key]?.(event);
  };

  const IsValid = (str) => {
    if (isEmail(str)) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  };

  const handleDialog = () => {
    setDialog(false);
  };
  const handleSubmit = () => {
    // LoginSubmit
    IsValid(Email);
    if (isEmail(Email)) {
      setDialog(false);
      CloseMenu();
    } else {
    }
  };

  return (
    <Box>
      <Button
        sx={{ px: 2, py: 1 }}
        onClick={() => setDialog(true)}
        startIcon={<Login />}
      >
        로그인
      </Button>
      <Dialog open={DialogOpen} onKeyDown={KeydownEvent} onClose={handleDialog}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            paddingTop: "1.5rem",
          }}
        >
          로그인
          <Login fontSize="large" sx={{ pl: 1 }} />
        </DialogTitle>
        <Stack spacing={2} sx={{ px: 3, py: 2 }}>
          <TextField
            autoFocus
            id="email"
            label="아이디 / 이메일"
            error={Validate}
            helperText={!Validate ? "" : "올바른 이메일을 입력해주세요"}
            placeholder="DUMMY@gmail.com"
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="password"
            label="비밀번호"
            type="password"
            placeholder="DUMMY@gmail.com"
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Stack direction="row-reverse">
            <Button onClick={handleSubmit}>로그인</Button>
            <Button onClick={handleDialog}>취소</Button>
          </Stack>
        </Stack>
      </Dialog>
    </Box>
  );
};

export default LoginModule;
