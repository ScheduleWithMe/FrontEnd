import {
  Box,
  Button,
  Container,
  Fade,
  Grid,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import MuiAlert from "@mui/material/Alert";
import { firebaseAddDoc } from "../../firebase";
import SubmitForm from "../../modules/SubmitForm";

function MainPage() {
  const LandingContents = (flag) => (
    <Grid container direction="column" display={flag ? "flex" : "none"}>
      <Grid item>
        <Typography>Schedule With Me</Typography>
      </Grid>
      <Grid item>
        <Button onClick={() => setToggle("host")}>H</Button>
        <Button onClick={() => setToggle("guest")}>G</Button>
      </Grid>
    </Grid>
  );
  const HostContents = (flag) => {
    return (
      <Grid container display={flag ? "flex" : "none"}>
        <Button onClick={() => setToggle("landing")}>X</Button>
        <Grid item xs={6}>
          <SubmitForm type="host" submitFunction={handleSubmit} />
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ width: "100%", height: "100%" }} />
        </Grid>
      </Grid>
    );
  };
  const GuestContents = (flag) => {
    return (
      <Grid container display={flag ? "flex" : "none"}>
        <Button onClick={() => setToggle("landing")}>X</Button>
        <Grid item xs={6}>
          <SubmitForm type="guest" submitFunction={handleSubmit} />
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ width: "100%", height: "100%" }} />
        </Grid>
      </Grid>
    );
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    content: "약속 생성에 실패했습니다! 입력값을 다시 확인해주세요.",
  });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [toggle, setToggle] = React.useState("landing");
  const handleSubmit = async (type, host, title, startDate) => {
    // if (type === "host") {
    //   if (host.length < 2 || title.length < 2 || startDate === null) {
    //     return setSnackbar({ ...snackbar, open: true });
    //   }
    // } else {
    //   if (host.length < 2) {
    //     return setSnackbar({ ...snackbar, open: true });
    //   }
    // }
    const Schedule = {
      hostNickname: host,
      title: title,
      startDate: startDate,
      times: [],
    };
    firebaseAddDoc(Schedule).then((response) => {
      // 현재 firebaseAddDoc 비활성화되어있음
      if (!response.success) return setSnackbar({ ...snackbar, open: true });
      return setModalOpen(true);
    });
  };
  return (
    <Container
      className="main"
      // sx={{
      //   width: 1200,
      //   height: 900,
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
    >
      <Fade in={toggle === "landing"}>
        {LandingContents(toggle === "landing")}
        {/* <ResultModal
          open={[modalOpen, setModalOpen]}
          renderData={testModalContents}
        /> */}
      </Fade>
      <Fade in={toggle === "host"}>{HostContents(toggle === "host")}</Fade>
      <Fade in={toggle === "guest"}>{GuestContents(toggle === "guest")}</Fade>
      {/* <Box>
        <SubmitForm type="host" submitFunction={handleSubmit} />
        <SubmitForm type="guest" submitFunction={handleSubmit} />
      </Box> */}

      {/* <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 10 }}
      >
        <Alert severity="error">{snackbar.content}</Alert>
      </Snackbar> */}
    </Container>
  );
}

export default MainPage;
