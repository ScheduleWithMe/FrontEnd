import React from 'react';
import { useState,useEffect } from "react";
import { collection, addDoc, updateDoc, getDoc, doc} from "firebase/firestore";
import { db } from "./firebase.js";
import moment from "moment";

const TimeSelect = (props) => {
  const [title, setTitle] = useState();
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

  const handleDoubleClick = (rowIndex, colIndex) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[rowIndex][colIndex] = false;
    setButtonStates(newButtonStates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const flattenedButtonStates = buttonStates.flat();
    const updatetime = {
      nickname : name,
      selectedTime : flattenedButtonStates
    }
    const updatedoc = async () => {
      const docRef2 = doc(db, "Schedules", "kvf2aXIKxSoyim61EIOD");
      const docSnap = await getDoc(docRef2);
      let updatedTimes = docSnap.data().times
      updatedTimes = updatedTimes.filter(item => item.email !== name);
      updatedTimes.push(updatetime);
      await updateDoc(docRef2, {
          times : updatedTimes
      }); 
      
    };
    console.log(name, flattenedButtonStates);
    updatedoc()
  };

  const buttonGrid = [];
  for (let i = 0; i < 7; i++) {
    const row = [];
    for (let j = 0; j < 24; j++) {
      row.push(
        <button
          key={`${i}-${j}`}
          style={{
            backgroundColor: buttonStates[i][j] ? "#5C5C5C" : "#D9D9D9",
            border : 'white',
            marginRight:"5px",
            marginBottom : "20px"
          }}
          onClick={() => handleClick(i, j)}
          onDoubleClick={() => handleDoubleClick(i, j)}
        >
        </button>
      );
    }
    buttonGrid.push(row);
  }

  useEffect(() => {
    if (startDate != null){
      const cntdate = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      cntdate.push(date.toISOString().split('T')[0]);
      setDates(cntdate)
    }
    console.log(dates)
  }
  },[startDate])

  useEffect(() => {
    const getUsers = async () => {
      const docRef2 = doc(db, "Schedules", "kvf2aXIKxSoyim61EIOD"); //routing되서 날아온 session 식별자 3번째 인자에 넣음
      const docSnap = await getDoc(docRef2);
      console.log(docSnap.data());
      setTitle(docSnap.data().title);
      setStartDate(docSnap.data().startDate);
      sethostEmail(docSnap.data().hostNickname);
    };
    getUsers();
  }, []);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "150px auto", columnGap: "20px"}}> 
        <div>타이틀 :</div>
        <div>
          <p>{title}</p>
        </div>
        <div>시작날짜 :</div>
        <div>
          <p>{startDate}</p>
        </div>
        <div>주최자 이메일 :</div>
        <div>
    <p>{hostEmail}</p>
  </div>
</div>
  <div style={{ display: "grid", gridTemplateColumns: "auto repeat(7, 1fr)"}}>
  <div style={{ display: "grid", gridTemplateRows: "repeat(8, 50px)"}}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor: "white",
      }}
    >
    </div>
    {dates.map((date) => (
      <div
        key={date}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "bold",
          backgroundColor: "white",
          marginRight : "30px"
        }}
      >
        {date}
      </div>
    ))}
  </div>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "50px repeat(23, 50px)",
      gridTemplateRows: "repeat(7, 50px)",
      justifyContent: "center",
    }}
  >
    {[...Array(24).keys()].map((hour) => (
      <div
        key={`time-${hour}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "bold",
          backgroundColor: "white",
          marginBottom : "20px"
        }}
      >
        {`${hour}`}
      </div>
    ))}
    {buttonGrid.flat()}
  </div>
  </div>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="이메일을 입력해주세요"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <button type="submit">제출</button>
  </form>

    </div>
  );
}

export default TimeSelect;