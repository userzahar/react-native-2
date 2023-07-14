
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from '../../firebase/config';
 
export const authSignUpUser = ({ email, password, login}) => async (dispatch, getState)=>{
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log("🤦‍♂️",user)
    } catch (er) {
        console.log("error: ",er)
        console.log("er.message: ",er.message)
    }
};

export const authSignInUser = ({email, password})=>async (dispatch, getState)=>{
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log("🤦‍♂️",user)
    } catch (er) {
        console.log("error: ",er)
        console.log("er.message: ",er.message)
    }
};

export const authSignOutUser = ()=>async (dispatch, getState)=>{}; 
