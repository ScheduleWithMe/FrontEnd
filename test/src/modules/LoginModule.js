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
import { firebaseAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase.js";
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
  const handleSubmit = async() => {
    try {
      console.log(Email)
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, Email, Password); // 실제로 로그인을 수행하는 함수
      const user = userCredential.user
      console.log(user.email); // 이런식으로 이메일을 가져올 수 있음
      setDialog(false);
      CloseMenu();
    } catch (error) {
  
      const errorCode = error.code;
  
      switch (errorCode) {

        // 지정된 이메일을 사용하는 사용자가 비활성화되었을 때
        case "auth/user-disabled":
          alert("해당 이메일은 비활성화 되었습니다")
          break;
  
        // 이메일에 해당하는 사용자가 없을 때
        case "auth/user-not-found":
          alert("해당 이메일은 없는 이메일 입니다")
          break;
  
        // 비밀번호가 유효하지 않을 때
        case "auth/wrong-password":
          alert("비밀번호를 확인해주세요!")
          break;
  
      }
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
