import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";


import CommentsScreen from "./src/Screens/CommentsScreen/CommentsScreen";
// import CreatePostsScreen from "./src/Screens/CreatePostsScreen/CreatePostsScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";
import PostsScreen from "./src/Screens/PostsScreen/PostsScreen";
// import ProfileScreen  from "./src/Screens/ProfileScreen/ProfileScreen";



const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto-Black.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
        <MainStack.Navigator 
        // initialRouteName="Home"
        >
          <MainStack.Screen 
          options={{headerShown:false}} 
            name="Registration"
            component={RegistrationScreen}
          />
          <MainStack.Screen 
          options={{headerShown:false}}  name="Login" component={LoginScreen} />
          <MainStack.Screen  
          options={{headerShown:false}} name="Home" component={PostsScreen} />
        </MainStack.Navigator>
          <StatusBar style="auto" />
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
