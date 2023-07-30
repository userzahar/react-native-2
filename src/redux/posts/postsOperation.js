import { db } from '../../firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore'; 
import { postsSlice } from './postsReducer';
const {getPosts,createPost,logoutPosts} = postsSlice.actions;


export const getDataFromFirestore = (userId) => async (dispatch, getState) => {
    try {
        
        if(userId){
            const allPosts = []; 
            const snapshot = await getDocs(collection(db, `posts:${userId}`));
            
            await snapshot.forEach( async (doc) => { 
                const document = doc.data();
        
                document.id = doc.id;    
                await allPosts.push(document);
            });
            await dispatch(getPosts({posts:allPosts}))
        }
    } catch (error) {
      console.log(error);
            throw error;
    }
  };

export const createPostToFirestore = (post) => async (dispatch, getState) => {
    
    try {
            dispatch(createPost({post}))
            const state = getState()
            const userId = state.auth.userId;
            const docRef = await addDoc(collection(db, `posts:${userId}`), post);
            console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.log("message: ",error.message)
    }
}

export const clearPostLogout = ()=> async (dispatch, getState) => {
    dispatch(logoutPosts([]))
}