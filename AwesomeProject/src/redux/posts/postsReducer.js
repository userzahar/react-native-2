import {createSlice} from "@reduxjs/toolkit";


const statek = {
    posts:[],
}

export const postsSlice = createSlice({
    name:"post",
    initialState:statek,
    reducers: {
        getPosts:((state,{payload})=>({
            ...state,
            posts: [...payload.posts]
        }
        
        ))
    }
})