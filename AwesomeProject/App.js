import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import backgroundImage from "./src/Images/Photo-BG.png";
import { StyleSheet, View, ImageBackground } from "react-native";
import RegistrationScreen from "./src/Screens/RegistrationScreen/RegistrationScreen";
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto-Black.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <RegistrationScreen />
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    position: "relative",
    top: 0,
    minWidth: "100%",
    minHeight: "100%",
  },
});
