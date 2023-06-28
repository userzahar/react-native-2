import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CommentsScreen from "./src/Screens/CommentsScreen/CommentsScreen";
import CreatePostsScreen from "./src/Screens/CreatePostsScreen/CreatePostsScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";
import PostsScreen from "./src/Screens/PostsScreen/PostsScreen";
import ProfileScreen  from "./src/Screens/ProfileScreen/ProfileScreen";




const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();


const useRoute = (isAuth)=>{
    if(!isAuth){
        return (
          <MainStack.Navigator>
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
        )
    }
    return (
      <MainTab.Navigator>
        <MainTab.Screen options={{headerShown:false}} name="Home" component={PostsScreen}/>
        <MainTab.Screen options={{headerShown:false}} name="CreatePostsScreen" component={CreatePostsScreen}/>
        <MainTab.Screen options={{headerShown:false}} name="ProfileScreen" component={ProfileScreen}/>
      </MainTab.Navigator>
    )
}
  
export default useRoute;