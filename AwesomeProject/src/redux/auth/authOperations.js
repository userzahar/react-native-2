import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import {auth} from "../../firebase/config"

export const authSingUp = ({ email, password }) => createUserWithEmailAndPassword(auth, email, password);

export const authStateChanged = async (onChange = () => {}) => {
        onAuthStateChanged((user) => {
                onChange(user);
        });
};

export const authSingIn = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
        return credentials.user;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (update) => {

  const user = auth.currentUser;

  if (user) {
        try {
            await updateProfile(user, update);
        } catch(error) {
            throw error
        }
  } 
};
