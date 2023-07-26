
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import {
getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const firebaseConfig = {
    apiKey: "AIzaSyDuixdXXobNS9Vr7ycDPkNmS9s0wTmQgDk",
    authDomain: "thenewproject-cdf27.firebaseapp.com",
    projectId: "thenewproject-cdf27",
    storageBucket: "thenewproject-cdf27.appspot.com",
    messagingSenderId: "523278025967",
    appId: "1:523278025967:web:3baebc489578f7d0dec71a",
    measurementId: "G-SB935BPX9F"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
//   "firebase": "^9.23.0",