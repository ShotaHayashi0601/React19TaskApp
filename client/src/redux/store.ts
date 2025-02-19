import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/TaskSlice';
export const store = configureStore({
  reducer: {
    modal: taskReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
