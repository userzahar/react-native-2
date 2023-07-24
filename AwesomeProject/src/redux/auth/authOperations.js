
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
                dispatch(updateUserProfile({userId,login}));
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
        dispatch(authSlice.actions.updateUserProfile({userId}));
        console.log("💕", {userId})
    } catch (er) {
        console.log("error: ",er)
        console.log("er.message: ",er.message)
    }
};

export const authSignOutUser = ()=>async (dispatch, getState)=>{}; 

// export const authStateChangeUser = () => async (dispatch, getState) => {
    
    // }
    
    //    await onAuthStateChanged(auth, (user)=>{
    //         if(user) {
    //             const userUpdateProfile = {
    //                 userId:user.uid,
    //                 login:user.displayName
    //             }
    //             dispatch(authStateChangeUser({stateChange:true}))
    //             dispatch(updateUserProfile(userUpdateProfile))
    //         }
    //    })