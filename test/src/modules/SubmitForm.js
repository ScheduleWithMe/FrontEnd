import {
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";

function SubmitForm(props) {
  // props 는 renderData 만 Object 형식으로 받아올 것.
  const handleSubmit = props.submitFunction;
  const type = props.type;
  const [host, setHost] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [startDate, setStartDate] = React.useState(null);

  const typeMapping = {
    host: [
      { title: "title", state: title, setState: setTitle },
      { title: "host", state: host, setState: setHost },
    ],
    guest: [{ title: "nickname", state: host, setState: setHost }],
  };
  const renderDataSpread = (data) => {
    return data.map((element, index) => (
      <Box key={`submitForm` + index} sx={{ p: 2 }}>
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
              fullWidth
              size="small"
              error={element.state.length > 0 && element.state.length < 2}
              helperText={
                element.state.length > 0 && element.state.length < 2
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

  return (
    <Paper sx={{ maxWidth: 800 }}>
      <Stack>
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
      </Stack>

      <Button onClick={() => handleSubmit(type, host, title, startDate)}>
        CHECK
      </Button>
    </Paper>
  );
}

export default SubmitForm;
