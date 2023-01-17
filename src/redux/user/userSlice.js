import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Initial State
const initialState = {
  currentUser: {},
  status: 'idle', // 'loading', 'successful', 'failed'
  login: false, // true if logged in
  message: '',
  error: null,
};

// Actions
const REGISTER = 'REGISTER';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';

// User Registration Action
export const registerUser = createAsyncThunk(REGISTER, async (user) => {
  try {
    return await api.register(user);
  } catch (error) {
    return error.message;
  }
});

// User Sign-in Action
export const signInUser = createAsyncThunk(SIGN_IN, async (user) => {
  try {
    return await api.sign_in(user);
  } catch (error) {
    return error.message;
  }
});

// User Sign-out Action
export const signOutUser = createAsyncThunk(SIGN_OUT, async () => {
  try {
    return await api.sign_out();
  } catch (error) {
    return error.message;
  }
});

// User Reducer
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // User Registration
      .addCase(registerUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }
      ))
      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        message: action.payload.message,
        status: 'successful',
      }))
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      // User Sign_in
      .addCase(signInUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(signInUser.fulfilled, (state, action) => ({
        ...state,
        currentUser: action.payload.currentUser,
        status: action.payload.status,
        login: action.payload.login,
        message: action.payload.message,
        error: action.payload.error,
      }))
      .addCase(signInUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      // User Sign_out
      .addCase(signOutUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(signOutUser.fulfilled, (state, action) => ({
        ...state,
        status: action.payload.status,
        login: action.payload.login,
        message: action.payload.message,
        error: action.payload.error,
      }))
      .addCase(signOutUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const currentUser = (state) => (state.user.currentUser);
export const status = (state) => (state.user.status);
export const sessionStatus = (state) => (state.user.login);

export default userSlice.reducer;
