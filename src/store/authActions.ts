// src/redux/authActions.js
// src/redux/authActions.ts
import { AppDispatch } from './index';
import { auth } from '../config/firebaseconfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';

export const loginUser = (email: string, password: string) => async (dispatch:AppDispatch ) => {
  try {
    dispatch(loginStart());
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(loginSuccess(userCredential.user));
  } catch (error:any) {
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => async (dispatch:AppDispatch ) => {
  await signOut(auth);
  dispatch(logout());
};

