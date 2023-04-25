import {
  Box,
  Button,
  Fade,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import MuiAlert from "@mui/material/Alert";
import { firebaseAddDoc } from "../../firebase";
import SubmitForm from "../../modules/SubmitForm";
import ResultModal from "../../modules/ResultModal";

const fadeTimeDuration = 800;
const buttonSX = {
  width: "22rem",
  height: "22rem",
  fontSize: "2.5rem",
};
const fullSX = { display: "flex", width: "100%", height: "100%" };

function MainPage() {
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
  const [modalContents, setModalContents] = React.useState({
    title: "세션생성 완료!",
    content: "",
  });
  const [toggle, setToggle] = React.useState("landing");
  const handleSubmit = async (type, host, title, startDate) => {
    const date = `${startDate.$y}-${startDate.$M + 1}-${startDate.$D}`;
    const Schedule = {
      hostNickname: host,
      title: title,
      startDate: date,
      times: [],
    };
    firebaseAddDoc(type, Schedule).then((response) => {
      if (!response.success) return setSnackbar({ ...snackbar, open: true });
      setModalContents({ ...modalContents, content: response.docRef });
    });
    console.log(
      "🚀 ~ file: MainPage.js:40 ~ MainPage ~ modalContents:",
      modalContents
    );
    setModalOpen(true);
    return;
  };
  const LandingContents = (flag) => (
    <Grid
      container
      direction="column"
      display={flag ? "flex" : "none"}
      className="center"
    >
      <Grid item sx={{ pb: 5 }}>
        <Typography fontSize="6rem">Schedule With Me</Typography>
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={5}>
          <Button
            sx={buttonSX}
            variant="outlined"
            onClick={() => setToggle("host")}
          >
            HOST
          </Button>
          <Button
            sx={buttonSX}
            variant="contained"
            onClick={() => setToggle("guest")}
          >
            GUEST
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
  const GuideContents = (flag, type) => {
    return (
      <Grid container className={`${type}`} display={flag ? "flex" : "none"}>
        <Grid item xs={6} display="flex" className="center">
          <Grid container className="center">
            <Grid item xs={10}>
              <SubmitForm
                type={type}
                setToggle={setToggle}
                submitFunction={handleSubmit}
              />
            </Grid>
          </Grid>
          {type === "host" && (
            <ResultModal
              open={[modalOpen, setModalOpen]}
              renderData={modalContents}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{ ...fullSX, backgroundColor: "#1269AE", borderRadius: 0 }}
            className="center"
          >
            <Typography variant="h3" color="white">
              적당한 이미지 넣어야돼요
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <Fade in={toggle === "landing"} timeout={fadeTimeDuration}>
        {LandingContents(toggle === "landing")}
      </Fade>
      <Fade in={toggle === "host"} timeout={fadeTimeDuration}>
        {GuideContents(toggle === "host", "host")}
      </Fade>
      <Fade in={toggle === "guest"} timeout={fadeTimeDuration}>
        {GuideContents(toggle === "guest", "guest")}
      </Fade>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 10 }}
      >
        <Alert severity="error">{snackbar.content}</Alert>
      </Snackbar>
    </Box>
  );
}

export default MainPage;
