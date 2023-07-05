import { createSlice } from '@reduxjs/toolkit';
import { reducer } from '../../Screens/RegistrationScreen/reducer';



export const authSlice = createSlice({
    name:"auth",
    initialState:{
        userID:null,
        nickname:null,
    },
    reducers:{}
});
