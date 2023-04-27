import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SessionModal(props) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  //submit function 가져오기
  const [open, setOpen] = props.open;
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    content: "공백 제외 2자 이상의 이름을 입력해주세요!",
  });

  const setNickName = props.setNickName;
  const [submit, setSubmit] = useState(false);
  const [value, setValue] = useState("");

  const handleNickname = () => {
    setSubmit(true);
    if (value.trim().length < 2) return;
    setNickName(value);
    setOpen(false);
  };
  return (
    <Dialog open={open}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 10 }}
      >
        <Alert severity="success">{snackbar.content}</Alert>
      </Snackbar>

      <DialogContent sx={{ display: "flex", flexDirection: "column", pt: 5 }}>
        <Typography>시간 선택에 앞서 ...</Typography>
        <Grid container sx={{ alignItems: "center", py: 3 }}>
          <TextField
            value={value}
            label="이름을 입력해주세요!"
            error={submit && value.trim().length < 2}
            helperText={
              submit && value.trim().length < 2
                ? "공백 제외 2자 이상 입력해주세요!"
                : ""
            }
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          />
        </Grid>
        <Stack spacing={1} direction="row" sx={{ justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={() => navigate("/")}>
            취소
          </Button>
          <Button variant="contained" onClick={handleNickname}>
            확인
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SessionModal;
