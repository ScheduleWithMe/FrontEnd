import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React, { useState } from "react";

// 다른 모달들과 다르게 일부러 모달 밖을 눌러도 안꺼지게 했습니다.
function ResultModal(props) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const title = props.renderData.title;
  const content = props.renderData.content;
  const [open, setOpen] = props.open;
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    content: "클립보드에 URL 을 복사했습니다!",
  });
  const [snackbarContent, setSnackbarContent] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        모달버튼입니다
      </Button>
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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Grid container sx={{ alignItems: "center", pb: 3 }}>
            <Typography>{content}</Typography>
            <CopyToClipboard
              text={content}
              onCopy={() => setSnackbar({ ...snackbar, open: true })}
            >
              <Button variant="contained">복사하기</Button>
            </CopyToClipboard>
          </Grid>
          <Grid container sx={{ justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={handleClose}>
              나갈래요
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResultModal;
