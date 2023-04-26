import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { useNavigate } from "react-router-dom";

const buttonSX = { width: "12.5rem", height: "5rem" };

function SubmitForm(props) {
  // props 는 renderData 만 Object 형식으로 받아올 것.
  const handleSubmit = props.submitFunction;
  const setToggle = props.setToggle;
  const type = props.type;
  const [host, setHost] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [startDate, setStartDate] = React.useState(null);
  const [submitFlag, setSubmitFlag] = React.useState(false);
  const navigate = useNavigate();
  const typeMapping = {
    host: [
      { title: "약속이름", state: title, setState: setTitle },
      { title: "주최자", state: host, setState: setHost },
    ],
    guest: [{ title: "URL", state: host, setState: setHost }],
  };
  const renderDataSpread = (data) => {
    return data.map((element, index) => (
      <Box key={`submitForm` + index} sx={{ p: 2, width: "100%" }}>
        <Grid container>
          <Grid
            xs={4}
            item
            container
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Typography>{element.title}</Typography>
          </Grid>
          <Grid xs={8} item container>
            <TextField
              size="small"
              sx={{ width: "80%" }}
              error={submitFlag && element.state.length < 2}
              helperText={
                submitFlag && element.state.length < 2
                  ? "2자 이상 입력해주세요!"
                  : ""
              }
              label={element.title}
              value={element.state}
              onChange={(e) => element.setState(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
    ));
  };
  const submitBubbling = (type, host, title, startDate) => {
    if (type === "guest") {
      navigate(`/${host}`);
      return;
    }
    setSubmitFlag(true);
    handleSubmit(type, host, title, startDate);
  };
  return (
    <Paper
      elevation={4}
      sx={{
        height: `${type === "host" ? "50rem" : "37rem"}`,
        width: "100%",
        maxWidth: 800,
        minWidth: 600,
      }}
    >
      <Grid container direction="column" sx={{ height: "100%" }}>
        <Grid item xs={4} className="flexCenter">
          {/* <Typography >Schedule With Me</Typography> */}
          <Typography fontSize="3rem" sx={{ fontWeight: 800 }}>
            <span style={{ color: "#1269AE" }}>S</span>chedule{" "}
            <span style={{ color: "#1269AE" }}>W</span>ith{" "}
            <span style={{ color: "#1269AE" }}>M</span>e
          </Typography>
        </Grid>
        <Grid xs={3} item>
          {renderDataSpread(typeMapping[type])}
          {type === "host" && (
            <Box sx={{ p: 2 }}>
              <Grid container>
                <Grid
                  xs={4}
                  item
                  container
                  sx={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Typography>시작 일자</Typography>
                </Grid>
                <Grid xs={8} item container>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      value={startDate}
                      closeOnSelect
                      onChange={(v) => setStartDate(v)}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
        <Grid item xs={2} className="flexCenter">
          <Stack direction="row" spacing={4}>
            <Button
              sx={buttonSX}
              variant="outlined"
              onClick={() => setToggle("landing")}
            >
              Cancel
            </Button>
            <Button
              sx={{
                ...buttonSX,
                display: `${type === "host" ? "block" : "none"}`,
                fontWeight: 800,
              }}
              variant="contained"
              onClick={() => submitBubbling(type, host, title, startDate)}
            >
              Submit Form
            </Button>
            <Button
              sx={{
                ...buttonSX,
                display: `${type === "guest" ? "block" : "none"}`,
                fontWeight: 800,
              }}
              variant="contained"
              onClick={() => submitBubbling(type, host, title, startDate)}
            >
              Enter
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SubmitForm;
