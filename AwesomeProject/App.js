import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./router";
import {Provider} from "react-redux"
import {store} from "./src/redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto-Black.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  
  const routes = useRoute({})
  
  return (
          <Provider store={store}>
            <NavigationContainer backBehavior="history">
                  {routes}
                  <StatusBar style="auto" />
            </NavigationContainer>
          </Provider>
      );
    }
    // import { PersistGate } from "redux-persist/integration/react";
    // {/* <PersistGate loading={null} persistor={persistor}> */}
    // </PersistGate>