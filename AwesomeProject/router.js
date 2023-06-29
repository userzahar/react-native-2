import React from "react";
import { View,StyleSheet, Pressable }  from "react-native"
import { useNavigation } from '@react-navigation/native';


import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// icons
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import CommentsScreen from "./src/Screens/CommentsScreen/CommentsScreen";
import CreatePostsScreen from "./src/Screens/CreatePostsScreen/CreatePostsScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";
import PostsScreen from "./src/Screens/PostsScreen/PostsScreen";
import ProfileScreen  from "./src/Screens/ProfileScreen/ProfileScreen";
import MapScreen from "./src/Screens/MapScreen/MapScreen";





const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();


const useRoute = (isAuth)=>{
    // const navigation = useNavigation();

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
      <MainTab.Navigator screenOptions={{
        tabBarShowLabel:false,
        tabBarStyle:{
            display:"flex",
            justifyContent: "center", 
            height:83,
    }
      }}>
        <MainTab.Screen 
            options={{ 
            headerTitleAlign:"center",
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleContainerStyle:{height:44, paddingTop:10},
            headerTitle:"Публікації", 
            headerRight:(
                { focused, color, size })=>{
                return (
                    <Pressable style={styles.headerButton} onPress={()=>{
                        alert("Чому скролл деколи заїдає? І як від цього позбутись?")
                    }}>
                        <Ionicons name="exit-outline" size={24} color="rgba(33, 33, 33, 0.8)" />
                    </Pressable>
                    )},
            tabBarIcon:(
                { focused, color, size })=>{
                    if(!focused){
                        return <AntDesign name="appstore-o" size={24} color="rgba(33, 33, 33, 0.8)" />
                    }
                return (
                    <View style={styles.buttonContainer}>
                        <AntDesign name="appstore-o" size={24} color="white" />
                    </View>
                    )}}} 
                name="Home" 
                component={PostsScreen}/>
        <MainTab.Screen
             options={{
                headerTitleAlign:"center",
                headerTitleStyle: styles.headerTitleStyle,
                headerTitleContainerStyle:{height:44,paddingTop:10},
                headerTitle:"Створити публікацію", 
                headerLeft:(
                    { focused, color, size })=>{
                    return (
                        <Pressable style={{paddingLeft:16,}} 
                        // onPress={()=>{
                        //     navigation.goBack();
                        // }}
                        >
                            <AntDesign name="arrowleft" size={24} color="#212121" />
                        </Pressable>
                        )},
                        tabBarStyle:{vision:"hidden",position:"absolute",top:-999},
                tabBarIcon:(
                { focused, color, size })=>{
                    if(!focused){
                        return <Feather name="plus" size={24} color="rgba(33, 33, 33, 0.8)" />
                            
                    }
                return (
                        <View style={styles.buttonContainer}>
                            <Feather name="plus" size={24} color="white" />
                        </View>
                        )}}} 
                name="CreatePostsScreen" 
                component={CreatePostsScreen}/>
        <MainTab.Screen 
            options={{
                headerShown:false, 
            tabBarIcon:({ focused, color, size })=>{
                if(!focused){
                    return <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
                }
            return (
                    <View style={styles.buttonContainer}>
                        <Feather name="user" size={24} color="white" />
                    </View>
                    )}}}  
            name="ProfileScreen" 
            component={ProfileScreen}/>

        <MainTab.Screen 
                options={{
                    headerTitleAlign:"center",
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitleContainerStyle:{height:44,paddingTop:10},
                    headerTitle:"Коментарі",
                    headerLeft:(
                        { focused, color, size })=>{
                        return (
                            <Pressable style={{paddingLeft:16,}} onPress={()=>{
                                alert("Як створити кнопку назад?")
                            }}>
                                <AntDesign name="arrowleft" size={24} color="#212121" />
                            </Pressable>
                            )},
                            tabBarStyle:{vision:"hidden",position:"absolute",top:-999},                     
                    tabBarIcon:()=>null,
                    tabBarButton:()=><View style={{vision:"hidden",position:"absolute", top:-999, width:-1, height:-1}}></View>
                }}  
            name="Commentary" 
            component={CommentsScreen}/>
                    <MainTab.Screen 
                options={{
                    headerTitleAlign:"center",
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitleContainerStyle:{height:44,paddingTop:10},
                    headerTitle:"Карта",
                    headerLeft:(
                        { focused, color, size })=>{
                        return (
                            <Pressable style={{paddingLeft:16,}} onPress={()=>{
                                alert("Як створити кнопку назад?")
                            }}>
                                <AntDesign name="arrowleft" size={24} color="#212121" />
                            </Pressable>
                            )},
                            tabBarStyle:{vision:"hidden",position:"absolute",top:-999},                     
                    tabBarIcon:()=>null,
                    tabBarButton:()=><View style={{vision:"hidden",position:"absolute", top:-999, width:-1, height:-1}}></View>
                }}  
            name="Map" 
            component={MapScreen}/>
      </MainTab.Navigator>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:100,
        backgroundColor:"#FF6C00",
        width:70,
        height:40,
    },
    headerButton:{
        paddingRight:10
    },
    headerTitleStyle: {
        width:"100%",
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.408,
        textAlign: "center",
        color: "#212121",
        
    },
})


export default useRoute;

