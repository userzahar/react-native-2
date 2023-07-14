
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../../router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authStateChangeUser } from "../redux/auth/authOperations";


export const Main = ()=>{
    const stateAuth = useSelector(state => state.auth.stateChange);
    console.log("stateAuth",stateAuth)
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(authStateChangeUser())
    //     console.log("перший рендер")
    // },[])
    const router = useRoute(stateAuth);
    return (
    <NavigationContainer>
        {router}
        <StatusBar style="auto" />
    </NavigationContainer>)
}