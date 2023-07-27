import { db } from '../../firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore'; 
import { postsSlice } from './postsReducer';
const {getPosts} = postsSlice.actions;


export const getDataFromFirestore = () => async (dispatch, getState) => {
    try {
        const snapshot = await getDocs(collection(db, 'posts'));
        await snapshot.forEach((doc) => { 
            const document = doc.data();
            document.id = doc.id;    
            console.log("document",document)
        dispatch(getPosts({posts:[{
            posts:document
        }]}))
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
            console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.log("message: ",error.message)
    }
}