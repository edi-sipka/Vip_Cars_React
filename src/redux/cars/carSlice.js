import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

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
    return await api.getAllCars();
  } catch (error) {
    return error.message;
  }
});

// Get Specific Car Action
export const getCar = createAsyncThunk(GET_CAR, async (carId) => {
  try {
    return await api.getCar(carId);
  } catch (error) {
    return error.message;
  }
});

// Car Addition Action
export const addCar = createAsyncThunk(ADD_CAR, async (car) => {
  try {
    return await api.addCar(car);
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
        car: action.payload.car,
        status: action.payload.status,
        message: action.payload.message,
        error: action.payload.error,
      }))
      .addCase(addCar.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const allCars = (state) => (state.carStore.cars);
export const requestedCar = (state) => (state.carStore.car);
export const carStatus = (state) => (state.carStore.status);
export const carMessage = (state) => (state.carStore.message);
export const carError = (state) => (state.carStore.error);

export default carSlice.reducer;
