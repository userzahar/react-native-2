const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);



import { initializeApp } from 'firebase/app';

import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

defaultConfig.resolver.assetExts.push('cjs');
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
module.exports = defaultConfig;