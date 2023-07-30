import {createSlice} from "@reduxjs/toolkit";

const userState = {
    userId:null,
    login:null,
    email:null,
    photoURL:'',
    stateChange: false,
}

export const authSlice = createSlice({
    name:"auth",
    initialState:userState,
    reducers:{
         updateUserProfile: ((state, { payload }) => ({
             ...state, 
             userId: payload.userId, 
             login:payload.login,
             email:payload.email,
             photoURL:payload.photoURL || ""
            })),

        authStateChange: ((state, { payload }) => ({ 
            ...state, 
            stateChange: payload.stateChange 
        })),

        authSingOut: ((state, { payload }) => ({ 
           ...state,
            userId:null,
            login:null,
            email:null,
            photoURL:'',
            stateChange: false
        }))
    }
})