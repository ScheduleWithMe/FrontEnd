import React from "react";
import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, getDoc, doc } from "firebase/firestore";
import { firebaseDB } from "./firebase";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
// import moment from "moment";
const row = [0, 1, 2, 3, 4, 5, 6];
const column = [
  7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 4,
  5, 6,
];
const gridSpcing = 2;

const TimeSelect = (props) => {
  const [title, setTitle] = useState();
  const [startPoint, setStartPoint] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [hostEmail, sethostEmail] = useState();
  const [buttonStates, setButtonStates] = useState(
    new Array(7).fill().map(() => new Array(24).fill(false))
  );
  const [name, setName] = useState("");
  const [dates, setDates] = useState([]);

  const handleClick = (rowIndex, colIndex) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[rowIndex][colIndex] = !newButtonStates[rowIndex][colIndex];
    setButtonStates(newButtonStates);
  };

  const handleDragEvent = (colIndex, rowIndex) => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const flattenedButtonStates = buttonStates.flat();
    const updatetime = {
      nickname: name,
      selectedTime: flattenedButtonStates,
    };
    // const updatedoc = async () => {
    //   const docRef2 = doc(db, "Schedules", "kvf2aXIKxSoyim61EIOD");
    //   const docSnap = await getDoc(docRef2);
    //   let updatedTimes = docSnap.data().times;
    //   updatedTimes = updatedTimes.filter((item) => item.email !== name);
    //   updatedTimes.push(updatetime);
    //   await updateDoc(docRef2, {
    //     times: updatedTimes,
    //   });
    // };
    // console.log(name, flattenedButtonStates);
    // updatedoc();
  };

  useEffect(() => {
    if (startDate != null) {
      const cntdate = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        cntdate.push(date.toISOString().split("T")[0]);
        setDates(cntdate);
      }
      console.log(dates);
    }
  }, [startDate]);

  useEffect(() => {
    const getUsers = async () => {
      const docRef2 = doc(firebaseDB, "Schedules", "kvf2aXIKxSoyim61EIOD"); // 여기에 useparam 값 넣어주면 됨
      const docSnap = await getDoc(docRef2);
      setTitle(docSnap.data().title);
      setStartDate(docSnap.data().startDate);
      sethostEmail(docSnap.data().hostNickname);
    };
    getUsers();
  }, []);

  return (
    <Paper
      elevation={4}
      className="flexCenter"
      sx={{ maxWidth: "80%", p: 3, fontFamily: "Inter" }}
      onMouseUp={(e) => setStartPoint(null)}
    >
      {/* <Box>
        <Box>
          <Grid container direction="row" fontFamily={"Roboto"}>
            <Grid xs={4} item>
              <Typography>타이틀 :</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography>{title}</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row">
            <Grid xs={4} item>
              <Typography>시작날짜 :</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography>{startDate}</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row">
            <Grid xs={4} item>
              <Typography>주최자 이메일 :</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography>{hostEmail}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box> */}
      <Grid container sx={{ width: "100%" }}>
        <Grid item>
          {/* dummyBox */}
          <Stack spacing={gridSpcing}>
            <Box sx={{ height: "2rem" }} />
            {dates.map((date) => (
              <Typography
                className="flexCenter"
                key={date}
                sx={{ height: "2rem" }}
              >
                {date.slice(5).replace("-", "월 ")}일{/* 왼쪽 날짜데이터 */}
              </Typography>
            ))}
          </Stack>
        </Grid>
        <Grid item className="flexCenter" xs={11}>
          <Stack spacing={gridSpcing}>
            <Stack direction={"row"} spacing={gridSpcing}>
              {column.map((hour) => (
                <Box
                  className="flexCenter"
                  key={`time-${hour}`}
                  direction={"row"}
                  sx={{ width: "2rem", height: "2rem", fontWeight: "bold" }}
                >
                  {`${hour >= 10 ? hour : "0" + hour}`}
                </Box>
              ))}
            </Stack>
            {row.map((i) => {
              return (
                <Stack spacing={gridSpcing} direction="row">
                  {column.map((j) => (
                    <Box
                      key={`${i}-${j}`}
                      sx={{
                        backgroundColor: `${
                          buttonStates[i][j] ? "#5C5C5C" : "#D9D9D9"
                        }`,
                        width: "2rem",
                        height: "2rem",
                      }}
                      onClick={() => handleClick(i, j)}
                      onMouseDown={(e) => setStartPoint([i, j])}
                      // onMouseUp={(e) => setStartPoint(null)}
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
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이메일을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">제출</button>
      </form> */}
    </Paper>
  );
};

export default TimeSelect;
