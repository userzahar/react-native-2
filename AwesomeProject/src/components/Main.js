
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../../router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authStateChangeUser } from "../redux/auth/authOperations";


export const Main = ()=>{
    const {userId,login,stateChange} = useSelector(state => state.auth);
    console.log("юзерАйдівРедаксі",userId)
    console.log("LoginРедаксі",login)
    console.log("stateChange v redux",stateChange)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(authStateChangeUser())
    },[])

    const router = useRoute(stateChange);
    return (
    <NavigationContainer>
        {router}
        <StatusBar style="auto" />
    </NavigationContainer>)
}