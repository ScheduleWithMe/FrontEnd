import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeSelect from "../../TimeSelect";
import SessionModal from "../../modules/SubmitModal";
import { getDoc, doc } from "firebase/firestore";
import { firebaseDB, firebaseGetTimes } from "../../firebase";
const rightSideBar = {
  borderTopLeftRadius: "1rem",
  borderBottomLeftRadius: "1rem",
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  pr: 0,
  pl: 3,
};

function SessionPage() {
  const [open, setOpen] = useState(true);
  const [nickName, setNickName] = useState("");
  const id = useParams().id;
  const [title, setTitle] = useState();
  const [startDate, setStartDate] = useState(null);
  const [hostEmail, sethostEmail] = useState();
  const [resultToggle, setResultToggle] = useState(false);
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const docRef2 = doc(firebaseDB, "Schedules", id); // 여기에 useparam 값 넣어주면 됨
        const docSnap = await getDoc(docRef2);
        setTitle(docSnap.data().title);
        setStartDate(docSnap.data().startDate);
        sethostEmail(docSnap.data().hostNickname);
      } catch (err) {
        alert(
          "올바르지 않은 세션주소입니다!\n세션 주소를 다시 한번 확인해주세요."
        );
        navigate("/FrontEnd");
      }
    };
    getUsers();
    // firebaseGetTimes(id).then((response) => {

    // });
  }, []);

  useEffect(() => {
    firebaseGetTimes(id).then((response) => {
      if (!response.success) return;
      setResult([...response.data]);
    });
  }, [resultToggle]);

  return (
    <Box sx={{ height: "100%" }}>
      <SessionModal open={[open, setOpen]} setNickName={setNickName} />
      <Grid
        container
        className="flexCenter"
        direction="column"
        sx={{ height: "100%" }}
      >
        <Grid item className="flexCenter" xs={3}>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            <span style={{ color: "#1269AE" }}>S</span>chedule{" "}
            <span style={{ color: "#1269AE" }}>W</span>ith{" "}
            <span style={{ color: "#1269AE" }}>M</span>e
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TimeSelect
            id={id}
            nickName={nickName}
            startDate={startDate}
            toggle={[resultToggle, setResultToggle]}
            result={result}
          />
          <Stack
            display={!resultToggle ? "flex" : "none"}
            sx={{
              position: "absolute",
              width: "18rem",
              right: 0,
              top: "25%",
            }}
            spacing={4}
          >
            <Paper
              elevation={8}
              sx={{
                ...rightSideBar,
                backgroundColor: "primary.main",
                color: "secondary.main",
              }}
            >
              <Stack sx={{ py: 2 }}>
                <Typography
                  variant="h5"
                  className="pb1"
                  sx={{ fontWeight: 800 }}
                >
                  Title
                </Typography>
                <Typography
                  display="flex"
                  className="pb1 "
                  sx={{
                    pt: 1,
                    borderBottom: "1px solid #DDDDDD",
                    fontWeight: 200,
                  }}
                >
                  {title}
                </Typography>
              </Stack>
            </Paper>
            <Paper
              elevation={8}
              sx={{
                ...rightSideBar,
                backgroundColor: "secondary.main",
                color: "primary.main",
              }}
            >
              <Stack sx={{ py: 2 }}>
                <Typography
                  className="pb1"
                  variant="h5"
                  sx={{ fontWeight: 800 }}
                >
                  Start Date
                </Typography>
                <Typography
                  display="flex"
                  className="pb1 "
                  sx={{
                    pt: 1,
                    borderBottom: "1px solid black",
                    fontWeight: 200,
                  }}
                >
                  {startDate}
                </Typography>
              </Stack>
            </Paper>
            <Paper
              elevation={8}
              sx={{
                ...rightSideBar,
                backgroundColor: "secondary.main",
                color: "primary.main",
              }}
            >
              <Stack sx={{ py: 2 }}>
                <Typography
                  className="pb1"
                  variant="h5"
                  sx={{ fontWeight: 800 }}
                >
                  Host Name
                </Typography>
                <Typography
                  display="flex"
                  className="pb1 "
                  sx={{
                    pt: 1,
                    borderBottom: "1px solid black",
                    fontWeight: 200,
                  }}
                >
                  {hostEmail}
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SessionPage;
