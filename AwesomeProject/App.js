import "react-native-gesture-handler";

import { useFonts } from "expo-font";

import useRoute from "./router";
import {Provider} from "react-redux"

import { store} from "./src/redux/store";
import { Main } from "./src/components/Main";


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
 
  const routes = useRoute(0===1)
  
  return (
      <Provider store={store}>

            <Main/>

      </Provider>


      );
    }