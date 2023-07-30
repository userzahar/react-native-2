import {createSlice} from "@reduxjs/toolkit";


const postState = {
    posts:[],
}

export const postsSlice = createSlice({
    name:"post",
    initialState:postState,
    reducers: {
        getPosts:((state,{payload})=>{
            return {
            ...state,
            posts: payload.posts
        }}),
        createPost:((state,{payload})=>({
            ...state,
            posts:[...state.posts, payload.post]
        })),
        logoutPosts:((state,{payload})=>({
           ...state,
           posts:[]
        }))
    }
})