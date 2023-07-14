// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDuixdXXobNS9Vr7ycDPkNmS9s0wTmQgDk",
    authDomain: "thenewproject-cdf27.firebaseapp.com",
    projectId: "thenewproject-cdf27",
    storageBucket: "thenewproject-cdf27.appspot.com",
    messagingSenderId: "523278025967",
    appId: "1:523278025967:web:3baebc489578f7d0dec71a",
    measurementId: "G-SB935BPX9F"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;