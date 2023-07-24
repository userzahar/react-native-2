
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../../router";
import { useDispatch, useSelector } from "react-redux";
import { auth } from '../firebase/config';
import { useEffect, useState } from "react";
import { authStateChangeUser } from "../redux/auth/authOperations";


export const Main = ()=>{
    const userId = useSelector(state => state.auth.userId);
    const login = useSelector(state => state.auth.login);
    console.log("юзерАйдівРедаксі",userId)
    console.log("LoginРедаксі",login)

    const[user,setUser] = useState(null)

    const dispatch = useDispatch()
    useEffect(()=>{
        auth.onAuthStateChanged(user=>setUser(user))
    },[])

    const router = useRoute(false);
    return (
    <NavigationContainer>
        {router}
        <StatusBar style="auto" />
    </NavigationContainer>)
}