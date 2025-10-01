import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import progressReducer from './slices/progressSlice';

const rootReducer = combineReducers({
  app: appReducer,
  progress: progressReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Correctly infer RootState

export default rootReducer;
