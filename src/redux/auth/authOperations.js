
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from '../../firebase/config';
// import { postsSlice } from '../posts/postsReducer';
import { authSlice } from './authReducer';
import { clearPostLogout } from '../posts/postsOperation';
// const {logoutPosts} = postsSlice.actions;

const {updateUserProfile, authSingOut, authStateChange} = authSlice.actions;

export const authSignUpUser = ({ email, password, login, avatar}) => async (dispatch, getState)=>{
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        const user = await auth.currentUser;
        const setLogin = login;

        if(user){
            try {
                await updateProfile(user, {displayName: setLogin, photoURL:avatar  });
                const updateUser = await auth.currentUser
                const userId = updateUser.uid
                const login = updateUser.displayName
                const photoURL = updateUser.photoURL
                const email = updateUser.email
                dispatch(updateUserProfile({userId,login,email,photoURL}));
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
        const login = data.user.displayName
        const photoURL = data.user.photoURL
        // const email = data.user.email
        dispatch(updateUserProfile({userId,login,email,photoURL}));
    } catch (er) {
        console.log("error: ",er)
        console.log("er.message: ",er.message)
    }
};

export const authSignOutUser = () => async (dispatch, getState)=>{
    auth.signOut();

    await dispatch(clearPostLogout())
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
    
