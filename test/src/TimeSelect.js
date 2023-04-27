import React from "react";
import { useState, useEffect } from "react";
import { firebaseUpdateTime } from "./firebase";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Autorenew, Groups, Person, Verified } from "@mui/icons-material";
// import moment from "moment";
const btn = [0, 1, 2, 3, 4];
const row = [0, 1, 2, 3, 4, 5, 6];
const column = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const submitRadius = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderTopRightRadius: ".5rem",
  borderBottomRightRadius: ".5rem",
  width: "6rem",
  height: "4rem",
};
const columnSpcing = 2;
const rowSpacing = 4;
const colorMap = {
  0: "#D9D9D9",
  1: "#C9532855",
  2: "#C9532899",
  3: "#C95328cc",
  4: "#C95328ff",
  5: "#C95328",
};
const gridElementHeight = "2.5rem";

const TimeSelect = (props) => {
  const id = props.id;
  const startDate = props.startDate;
  const [maxCount, setMaxCount] = useState(0);
  const [startPoint, setStartPoint] = useState(null);
  const [buttonStates, setButtonStates] = useState(
    new Array(7).fill().map(() => new Array(24).fill(false))
  );
  const [useSelected, setUserSelected] = useState(new Array(5).fill(true));
  const [resultCount, setResultcount] = useState(
    new Array(7).fill().map(() => new Array(24).fill(0))
  );
  const nickName = props.nickName;
  const [dates, setDates] = useState([]);
  const [resultToggle, setResultToggle] = props.toggle;
  const result = props.result;

  useEffect(() => {
    if (!result) return;
    const newResultCount = new Array(168).fill(0);
    let mCount = 0;
    btn.map((i) => {
      if (useSelected[i] && result[i]) {
        for (let j = 0; j < 168; j++) {
          if (result[i].selectedTime[j]) {
            newResultCount[j] = newResultCount[j] + 1;
            if (mCount < newResultCount[j]) mCount = newResultCount[j];
          }
        }
      }
    });
    setMaxCount(mCount);
    setResultcount(newResultCount);
  }, [result, useSelected]);

  useEffect(() => {
    setButtonStates(new Array(7).fill().map(() => new Array(24).fill(false)));
  }, [resultToggle]);

  useEffect(() => {
    if (startDate != null) {
      const cntdate = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        cntdate.push(date.toISOString().split("T")[0]);
        setDates(cntdate);
      }
    }
  }, [startDate]);

  const handleClick = (rowIndex, colIndex) => {
    if (resultToggle) return;
    const newButtonStates = [...buttonStates];
    newButtonStates[rowIndex][colIndex] = !newButtonStates[rowIndex][colIndex];
    setButtonStates(newButtonStates);
  };

  const handleDragEvent = (colIndex) => {
    if (resultToggle) return;
    if (startPoint) {
      const [startRow, startCol] = startPoint;
      const newButtonStates = [...buttonStates];
      const [min, max] = [
        Math.min(startCol, colIndex),
        Math.max(startCol, colIndex),
      ];
      for (let i = min; i <= max; i++) {
        newButtonStates[startRow][i] = true;
      }
      setButtonStates(newButtonStates);
    }
  };
  const handleSubmit = () => {
    const flattenedButtonStates = buttonStates.flat();
    const updatetime = {
      nickname: nickName,
      selectedTime: flattenedButtonStates,
    };
    firebaseUpdateTime(id, updatetime).then((response) => {
      if (!response.success) return;
      setResultToggle(true);
    });
  };

  const handleReset = () => {
    setButtonStates(new Array(7).fill().map(() => new Array(24).fill(false)));
  };

  const handleUserToggle = (index) => {
    const newUseSelected = [...useSelected];
    newUseSelected[index] = !newUseSelected[index];
    setUserSelected(newUseSelected);
  };

  return (
    <Stack direction="row">
      <Paper
        elevation={4}
        className="flexCenter"
        sx={{ minWidth: 1300, p: 3, zIndex: 2 }}
        onMouseUp={(e) => setStartPoint(null)}
      >
        <Grid container>
          <Grid item xs={1}>
            {/* dummyBox */}
            <Stack spacing={rowSpacing}>
              <Box className="flexCenter" sx={{ height: gridElementHeight }}>
                <Person fontSize={`${!resultToggle ? "large" : ""}`} />
                <Switch
                  checked={resultToggle}
                  onChange={() => setResultToggle(!resultToggle)}
                />
                <Groups fontSize={`${resultToggle ? "large" : ""}`} />
              </Box>
              {dates.map((date) => (
                <Typography
                  className="flexCenter"
                  key={date}
                  sx={{ height: gridElementHeight, fontFamily: "Noto Sans KR" }}
                >
                  {date.slice(5).replace("-", "월 ")}일
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid item className="flexCenter" xs={11}>
            <Stack spacing={rowSpacing}>
              <Stack direction={"row"} spacing={columnSpcing}>
                {column.map((hour) => (
                  <Box
                    className="flexCenter"
                    key={`time-${hour}`}
                    direction={"row"}
                    sx={{
                      width: "2rem",
                      height: gridElementHeight,
                      fontFamily: "Noto Sans KR",
                      fontWeight: 200,
                    }}
                  >
                    {`${hour >= 10 ? hour : "0" + hour}`}
                  </Box>
                ))}
              </Stack>
              {row.map((i) => {
                return (
                  <Stack
                    key={`row-${i}`}
                    spacing={columnSpcing}
                    direction="row"
                  >
                    {column.map((j) => (
                      <Box
                        key={`${i}-${j}`}
                        sx={{
                          backgroundColor: `${
                            resultToggle
                              ? colorMap[resultCount[i * 24 + j]]
                              : buttonStates[i][j]
                              ? "#5C5C5C"
                              : "#D9D9D9"
                          }`,
                          width: "2rem",
                          height: gridElementHeight,
                          border: `${
                            resultToggle &&
                            maxCount > 1 &&
                            resultCount[i * 24 + j] === maxCount
                              ? "2px solid black"
                              : "0px solid"
                          }`,
                        }}
                        onClick={() => {
                          handleClick(i, j);
                        }}
                        onMouseDown={(e) => setStartPoint([i, j])}
                        onMouseMove={(e) =>
                          startPoint ? handleDragEvent(j, i) : ""
                        }
                      ></Box>
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Stack
        display={`${resultToggle ? "flex" : "none"}`}
        justifyContent="space-evenly"
      >
        {btn.map((i) => {
          if (result[i])
            return (
              <Paper key={i} sx={{ ...submitRadius }} elevation={8}>
                <Button
                  variant={`${useSelected[i] ? "contained" : "outlined"}`}
                  size="large"
                  sx={submitRadius}
                  onClick={() => {
                    handleUserToggle(i);
                  }}
                >
                  <Typography>{result[i].nickname}</Typography>
                </Button>
              </Paper>
            );
          else return <Box key={i} />;
        })}
      </Stack>
      <Stack
        display={`${!resultToggle ? "flex" : "none"}`}
        justifyContent="space-around"
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Stack spacing={4}>
          <Paper sx={{ ...submitRadius }} elevation={8}>
            <Button
              variant={`contained`}
              size="large"
              sx={{ ...submitRadius, flexDirection: "column-reverse" }}
              onClick={() => {
                handleReset();
              }}
            >
              <Typography>초기화</Typography>
              <Autorenew fontSize="large" />
            </Button>
          </Paper>
          <Paper sx={{ ...submitRadius }} elevation={8}>
            <Button
              variant={`contained`}
              size="large"
              sx={{ ...submitRadius, flexDirection: "column-reverse" }}
              onClick={() => handleSubmit()}
            >
              <Typography>제출</Typography>
              <Verified fontSize="large" />
            </Button>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TimeSelect;
