import { db } from '../../firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore'; 
import { postsSlice } from './postsReducer';
const {getPosts,createPost} = postsSlice.actions;

const allPosts = []; 

export const getDataFromFirestore = () => async (dispatch, getState) => {
    try {
        const snapshot = await getDocs(collection(db, 'posts'));
        await snapshot.forEach( async (doc) => { 
            const document = doc.data();
            document.id = doc.id;    
            await allPosts.push(document);
        dispatch(getPosts({posts:allPosts}))
        });
    } catch (error) {
      console.log(error);
            throw error;
    }
  };

export const createPostToFirestore = (post) => async (dispatch, getState) => {
    console.log("пост який надсилаєм:",post)
    try {
            const docRef = await addDoc(collection(db, 'posts'), post);
            dispatch(createPost({post}))
            console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.log("message: ",error.message)
    }
}