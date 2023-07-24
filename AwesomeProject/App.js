import "react-native-gesture-handler";

import { useFonts } from "expo-font";

import {Provider} from "react-redux"


import { store} from "./src/redux/store";
import { Main } from "./src/components/Main";
import { useState } from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto-Black.ttf"),
  });


  if (!fontsLoaded) {
    return null;
  }


  
  return (
      <Provider store={store}>

            <Main/>

      </Provider>


      );
    }