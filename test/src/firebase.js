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
const firebaseAddDoc = async (Schedule) => {
  try {
    if (
      Schedule.hostNickname.length < 2 ||
      Schedule.title.length < 2 ||
      Schedule.startDate === null
    )
      throw new Error("Invalid-submitForm");

    // const docRef = await addDoc(collection(firebaseDB, "Schedules"), Schedule);
    return { success: true, docRef: "URL" };
  } catch (err) {
    return { success: false, error: err };
  }
};

const firebaseUpdateTime = async (docRef, time) => {
  try {
    if (time.nickname.length < 2) throw new Error("Invalid-submitForm");
    const nickname = time.nickname;
    const selectedTime = time.selectedTime;
    const docRef2 = doc(firebaseDB, "Schedules", docRef.id); // id 값을 통해 ref를 받아올 수 있음

    const docs = await getDoc(docRef2);
    let updatedTimes = docs.data().times;
    updatedTimes = updatedTimes.filter((item) => item.nickname !== nickname);
    updatedTimes.push(selectedTime);
    await updateDoc(docRef, {
      times: updatedTimes,
    });
    return { success: true };
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
};
