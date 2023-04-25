import { GroupAdd } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import isEmail from "validator/lib/isEmail";
import React from "react";
import MuiAlert from "@mui/material/Alert";
import { firebaseAuth, createUserWithEmailAndPassword } from "../firebase.js";

const RegistModule = (CloseMenu) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [DialogOpen, setDialog] = React.useState(false);
  const [emailValidate, setEmailValidate] = React.useState(false);
  const [nickameValidate, setNicknameValidate] = React.useState(true);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    content: "",
  });
  const [snackbarContent, setSnackbarContent] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Compare, setCompare] = React.useState("");
  const [NickName, setNickName] = React.useState("");
  const [Loading, setLoading] = React.useState(undefined);
  const [ErrorCode, setErrorCode] = React.useState("");
  const stateReset = () => {
    setEmail("");
    setPassword("");
    setCompare("");
    setNickName("");
  };

  React.useEffect(() => {
    const rejectMap = {
      email: "이메일",
      nickname: "닉네임",
    };
    switch (Loading) {
      case undefined:
        return;
      case "pending":
        return;
      case "rejected":
        if (ErrorCode === "email") setEmailValidate(false);
        if (ErrorCode === "nickname") setNicknameValidate(false);
        setSnackbar({
          ...snackbar,
          open: true,
          content: rejectMap[ErrorCode],
        });
        return;
      case "fulfilled":
        stateReset();
        return;
      default:
        return;
    }
  }, [Loading]);
  const typeSwitch = (target) => {
    const [opt1, opt2, str1, str2] = Object.values(target);
    return opt1 ? str1 : opt2 ? str2 : str1;
  };
  const validCheckDict = {
    Email: {
      case1: emailValidate,
      case2: true,
      alert1: "",
      alert2: "올바른 이메일을 입력해주세요",
      empty: Email.length === 0,
    },
    Password: {
      case1: Password.length !== 0 && Password.length < 6,
      case2: Password.length > 12,
      alert1: "6~12글자 사이로 설정해주세요",
      alert2: "비밀번호 최대길이는 12글자 입니다.",
      empty: Password.length === 0,
    },
    Compare: {
      case1: Compare !== Password,
      case2: Compare.length > 5 && Compare.length < 12,
      alert1: "비밀번호를 확인해주세요",
      alert2: "",
      empty: Compare.length === 0,
    },
    NickName: {
      case1: NickName.length !== 0 && NickName.length < 2,
      case2: NickName.length > 10,
      alert1: "2~10 글자의 닉네임을 작성해주세요",
      alert2: "닉네임의 최대길이는 10글자입니다",
      empty: NickName.length === 0,
    },
  };

  const colorMap = {
    Email: emailValidate ? "success" : "",
    Password:
      !validCheckDict.Password.empty &&
      !validCheckDict.Password.case1 &&
      !validCheckDict.Password.case2
        ? "success"
        : "",
    Compare:
      !validCheckDict.Compare.empty &&
      !validCheckDict.Compare.case1 &&
      validCheckDict.Compare.case2
        ? "success"
        : "",
    NickName:
      nickameValidate &&
      !validCheckDict.NickName.empty &&
      !validCheckDict.NickName.case1 &&
      !validCheckDict.NickName.case2
        ? "success"
        : "",
  };

  const stopPropagationForTab = (event) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
  };
  const IsValid = (str) => {
    if (isEmail(str)) {
      setEmailValidate(true);
    } else {
      setEmailValidate(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        Email,
        Password
      ); // 실제로 회원가입을 수행하는 함수
      const user = userCredential.user;

      console.log(user.email); // 이런식으로 이메일을 가져올 수 있음
      setLoading("pending");
      CloseMenu();
    } catch (error) {
      const errorCode = error.code;

      switch (errorCode) {
        // 이미 가입된 이메일인 경우
        case "auth/email-already-in-use":
          alert("이미 가입된 이메일 입니다");
          break;

        // 이메일 형식이 유효하지 않을 때
        case "auth/invalid-email":
          alert("이메일 형식이 유효하지 않습니다");
          break;

        // firebase 설정에서 이메일/비밀번호 계정이 활성화되어 있지 않은 경우
        case "auth/operation-not-allowed":
          break;

        // 비밀번호가 충분히 강력하지 않은 경우
        case "auth/weak-password":
          alert("비밀번호 정책을 다시 확인해 주세요");
          break;
      }
    }
    // IsValid(Email);
    // if (isEmail(Email)) {
    //   if (Password !== Compare) {
    //     return alert("비밀번호가 일치하지 않습니다");
    //   }
    //   setLoading("pending");
    //   setLoading("rejected");
    //   return;
    // } else {
    //   return alert("이메일 양식이 올바르지 않습니다");
    // }
  };

  const handleDialog = () => {
    setDialog(false);
  };

  return (
    <Box>
      <Button
        sx={{ px: 2, py: 1 }}
        onClick={() => setDialog(true)}
        startIcon={<GroupAdd />}
      >
        회원가입
      </Button>
      <Dialog
        open={DialogOpen}
        onKeyDown={stopPropagationForTab}
        onClose={handleDialog}
      >
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{ mb: 10 }}
        >
          <Alert severity="error">
            이미 사용중인 {snackbar.content} 입니다!
          </Alert>
        </Snackbar>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            paddingTop: "1.5rem",
          }}
        >
          회원가입 <GroupAdd fontSize="large" sx={{ pl: 1 }} />
        </DialogTitle>
        <Stack spacing={2} sx={{ px: 3, py: 2 }}>
          <TextField
            autoFocus
            id="email"
            label="아이디 / 이메일"
            type="email"
            value={Email}
            error={!emailValidate && !validCheckDict.Email.empty}
            helperText={typeSwitch(validCheckDict.Email)}
            color={colorMap.Email}
            placeholder="DUMMY@gmail.com"
            variant="outlined"
            onChange={(event) => {
              setEmailValidate(isEmail(event.target.value));
              setEmail(event.target.value);
            }}
          />
          <TextField
            id="password"
            label="비밀번호"
            placeholder="abcd1234"
            type="password"
            error={
              validCheckDict.Password.case1 || validCheckDict.Password.case2
            }
            helperText={typeSwitch(validCheckDict.Password)}
            color={colorMap.Password}
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            id="comparePassword"
            label="비밀번호 확인"
            placeholder="abcd1234"
            type="password"
            error={
              (validCheckDict.Compare.case1 || !validCheckDict.Compare.case2) &&
              Password.length > 3
            }
            helperText={typeSwitch(validCheckDict.Compare)}
            color={colorMap.Compare}
            variant="outlined"
            onChange={(event) => setCompare(event.target.value)}
          />
          <TextField
            id="nickname"
            label="닉네임"
            type="text"
            placeholder="CHARLES"
            error={
              validCheckDict.NickName.case1 || validCheckDict.NickName.case2
            }
            color={colorMap.NickName}
            className={colorMap.NickName}
            helperText={typeSwitch(validCheckDict.NickName)}
            variant="outlined"
            onChange={(event) => setNickName(event.target.value)}
          />
          <Stack direction="row-reverse">
            <Button onClick={handleSubmit}>확인</Button>
            <Button onClick={handleDialog}>취소</Button>
          </Stack>
        </Stack>
      </Dialog>
    </Box>
  );
};

export default RegistModule;
