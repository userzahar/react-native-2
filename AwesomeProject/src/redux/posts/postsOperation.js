import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore'; 
import { postsSlice } from './postsReducer';
const {getPosts} = postsSlice.actions;


export const getDataFromFirestore = () => async (dispatch, getState) => {
    try {
        const snapshot = await getDocs(collection(db, 'posts'));
        await snapshot.forEach((doc) => {     
        dispatch(getPosts({posts:[{
            id:doc.id,
            posts:doc.data()
        }]}))
        });
    } catch (error) {
      console.log(error);
            throw error;
    }
  };