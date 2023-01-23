import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { currentUser } from '../user/userSlice';

// Initial State
const initialState = {
  reservations: [],
  reservation: {},
  status: 'idle', // 'loading', 'successful', 'failed'
  message: '',
  error: null,
};

// Actions
const GET_RESERVATIONS = 'GET_RESERVATIONS';
const GET_RESERVATION = 'GET_RESERVATION';
const ADD_RESERVATION = 'ADD_RESERVATION';
const REMOVE_RESERVATION = 'REMOVE_RESERVATION';

// Get All Reservation Action
export const getAllReservations = createAsyncThunk(GET_RESERVATIONS, async () => {
  try {
    const userId = currentUser.id;
    return await api.getAllReservation(userId);
  } catch (error) {
    return error.message;
  }
});

// Get Reservation Action
export const getReservation = createAsyncThunk(GET_RESERVATION, async ({ userId, resId }) => {
  try {
    return await api.getReservation(userId, resId);
  } catch (error) {
    return error.message;
  }
});

// Reservation Addition Action
export const addReservation = createAsyncThunk(ADD_RESERVATION, async (reservation) => {
  try {
    const userId = currentUser.id;
    return await api.addReservation(userId, reservation);
  } catch (error) {
    return error.message;
  }
});

// Reservation Removal Action
export const removeReservation = createAsyncThunk(REMOVE_RESERVATION, async (resId) => {
  try {
    const userId = currentUser.id;
    return await api.addCar(userId, resId);
  } catch (error) {
    return error.message;
  }
});

// User Reducer
const reservationSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setStatusIdle: (state) => ({
      ...state,
      status: 'idle',
      message: '',
    }),
  },
  extraReducers: (builder) => {
    builder
      // Get all cars
      .addCase(getAllReservations.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getAllReservations.fulfilled, (state, action) => ({
        ...state,
        reservations: action.payload,
        status: 'successful',
      }))
      .addCase(getAllReservations.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      // Get a specific reservation
      .addCase(getReservation.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getReservation.fulfilled, (state, action) => ({
        ...state,
        reservation: action.payload,
        status: 'successful',
      }))
      .addCase(getReservation.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      // Add reservation
      .addCase(addReservation.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(addReservation.fulfilled, (state, action) => ({
        ...state,
        message: action.payload.message,
        status: 'successful',
      }))
      .addCase(addReservation.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      // Remove reservation
      .addCase(removeReservation.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(removeReservation.fulfilled, (state, action) => ({
        ...state,
        reservations: [
          ...state.reservations.filter((res) => res.id !== action.payload.data.id),
        ],
        message: action.payload.message,
        status: 'successful',
      }))
      .addCase(removeReservation.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { setStatusIdle } = reservationSlice.actions;
export const allReservations = (state) => (state.reservationStore.reservations);
export const requestedReservation = (state) => (state.reservationStore.reservation);
export const resStatus = (state) => (state.reservationStore.status);
export const resMessage = (state) => (state.reservationStore.message);

export default reservationSlice.reducer;
