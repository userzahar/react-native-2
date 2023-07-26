
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from './authReducer';

const {updateUserProfile, authSingOut, authStateChange} = authSlice.actions;

export const authSignUpUser = ({ email, password, login}) => async (dispatch, getState)=>{
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        const user = await auth.currentUser;
        const setLogin = login;
        if(user){
            try {
                await updateProfile(user, {displayName: setLogin });
                const updateUser = await auth.currentUser
                console.log("updateUser updateUser",updateUser)
                const userId = updateUser.uid
                const login = updateUser.displayName
                const email = updateUser.email
                dispatch(updateUserProfile({userId,login,email}));
            } catch (error) {
                console.log("🤦‍♂️error: ",error)
            }
        }

    } catch (er) {
        console.log("error: ",er)
        console.log("er.message: ",er.message)
    }
};

export const authSignInUser = ({email, password})=>async (dispatch, getState)=>{
    try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        const userId = data.user.uid;
        dispatch(updateUserProfile({userId}));
        console.log("💕", {userId})
    } catch (er) {
        console.log("error: ",er)
        console.log("er.message: ",er.message)
    }
};

export const authSignOutUser = () => async (dispatch, getState)=>{
    auth.signOut();
    dispatch(authSingOut())
}; 

export const authStateChangeUser = () => async (dispatch, getState) => {
    auth.onAuthStateChanged((user)=>{
        if(user){
            const updateUser = {
                userId: user.uid,
                login: user.displayName,
                email:user.email,
            }
            dispatch(authStateChange({stateChange:true})); 
            dispatch(updateUserProfile(updateUser)); 
        }
    })
    }
    
