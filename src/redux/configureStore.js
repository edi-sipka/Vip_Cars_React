import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './user/userSlice';
import carReducer from './cars/carSlice';
import reservationSlice from './reservations/reservationSlice';

const rootReducer = combineReducers({
  userStore: userReducer,
  carStore: carReducer,
  reservationStore: reservationSlice,
});

const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  },
);


export default store;
