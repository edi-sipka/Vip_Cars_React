import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './user/userSlice';
import carReducer from './cars/carSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cars: carReducer,
});

const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  },
);

export default store;
