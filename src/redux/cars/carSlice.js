import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { currentUser } from '../user/userSlice';

// Initial State
const initialState = {
  cars: [],
  car: {},
  status: 'idle', // 'loading', 'successful', 'failed'
  message: '',
  error: null,
};

// Actions
const GET_ALL_CARS = 'GET_ALL_CARS';
const GET_CAR = 'GET_CAR';
const ADD_CAR = 'ADD_CAR';

// Get All Cars Action
export const getAllCars = createAsyncThunk(GET_ALL_CARS, async () => {
  try {
    const userId = currentUser.id;
    return await api.getAllCars(userId);
  } catch (error) {
    return error.message;
  }
});

// Get Specific Car Action
export const getCar = createAsyncThunk(GET_CAR, async (carId) => {
  try {
    const userId = currentUser.id;
    return await api.getCar(userId, carId);
  } catch (error) {
    return error.message;
  }
});

// Car Addition Action
export const addCar = createAsyncThunk(ADD_CAR, async (car) => {
  try {
    const userId = currentUser.id;
    return await api.addCar(userId, car);
  } catch (error) {
    return error.message;
  }
});

// User Reducer
const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all cars
      .addCase(getAllCars.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getAllCars.fulfilled, (state, action) => ({
        ...state,
        cars: action.payload,
        status: 'successful',
      }))
      .addCase(getAllCars.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      // Get a specific car
      .addCase(getCar.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getCar.fulfilled, (state, action) => ({
        ...state,
        car: action.payload,
        status: 'successful',
      }))
      .addCase(getCar.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      // Add car
      .addCase(addCar.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(addCar.fulfilled, (state, action) => ({
        ...state,
        message: action.payload.message,
        status: 'successful',
      }))
      .addCase(addCar.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const allCars = (state) => (state.cars.cars);
export const requestedCar = (state) => (state.cars.car);
export const status = (state) => (state.cars.status);
export const carMessage = (state) => (state.cars.message);

export default carSlice.reducer;
