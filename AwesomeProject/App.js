import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {NavigationContainer} from "@react-navigation/native"
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
  // import RegistrationScreen from "./src/Screens/RegistrationScreen/RegistrationScreen";
// import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";
import PostsScreen from "./src/Screens/PostsScreen/PostsScreen";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto-Black.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <RegistrationScreen /> */}
        {/* <LoginScreen /> */}
        <PostsScreen />
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
});
