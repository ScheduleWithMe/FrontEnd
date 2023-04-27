import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  getDoc,
  doc,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_API_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDB = getFirestore(firebaseApp);
//
const firebaseAddDoc = async (type, Schedule) => {
  try {
    if (
      type === "host" &&
      (Schedule.hostNickname.trim().length < 2 ||
        Schedule.title.trim().length < 2 ||
        Schedule.startDate === null)
    )
      throw new Error("Invalid-submitForm");
    if (type === "guest" && Schedule.hostNickname.trim().length < 2)
      throw new Error("Invalid-submitForm");
    const docRef = await addDoc(collection(firebaseDB, "Schedules"), Schedule);
    return { success: true, docRef: docRef.id };
  } catch (err) {
    return { success: false, error: err };
  }
};

const firebaseUpdateTime = async (url, time) => {
  try {
    if (time.nickname.trim().length < 2) throw new Error("Invalid-submitForm");
    const docRef = doc(firebaseDB, "Schedules", url); // id 값을 통해 ref를 받아올 수 있음
    const nickname = time.nickname;
    const selectedTime = time.selectedTime;
    const docs = await getDoc(docRef);
    let updatedTimes = docs.data().times;
    updatedTimes = updatedTimes.filter((item) => item.nickname !== nickname);
    updatedTimes.push({ nickname: nickname, selectedTime: selectedTime });
    await updateDoc(docRef, {
      times: updatedTimes,
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
};
const firebaseGetTimes = async (url) => {
  try {
    const docRef = doc(firebaseDB, "Schedules", url); // id 값을 통해 ref를 받아올 수 있음
    const docs = await getDoc(docRef);
    let all_available_times = []; // 이 배열에 모든 사람들의 가능한 시간들이 기록됨

    for (let time of docs.data().times) {
      all_available_times.push(time);
    }
    return { success: true, data: all_available_times };
  } catch (err) {
    return { success: false, error: err };
  }
};

export default firebaseApp;
export {
  firebaseDB,
  firebaseAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseUpdateTime,
  firebaseAddDoc,
  firebaseGetTimes,
};
