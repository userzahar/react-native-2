
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../../router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authStateChangeUser } from "../redux/auth/authOperations";


export const Main = ()=>{
    const stateChange = useSelector(state => state.auth.stateChange);
    console.log("stateChange",stateChange)
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(authStateChangeUser())
    //     console.log("перший рендер")
    // },[])
    const router = useRoute(stateChange);
    return (
    <NavigationContainer>
        {router}
        <StatusBar style="auto" />
    </NavigationContainer>)
}