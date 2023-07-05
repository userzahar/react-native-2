import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// const { getDefaultConfig } = require('@expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push('cjs');

import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC5Lg8LHPVsXOfM9tRGb7MCsj2IlpKMMYc",
  authDomain: "lolnew-63336.firebaseapp.com",
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: "lolnew-63336",
  storageBucket: "lolnew-63336.appspot.com",
  messagingSenderId: "281040220398",
  appId: "1:281040220398:web:74ca177f44d668c10183ff",
  measurementId: "G-3024X4JPWJ"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// module.exports = defaultConfig;