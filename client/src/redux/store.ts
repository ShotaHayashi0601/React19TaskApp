import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/TaskSlice';
import columnReducer from './slices/ColumnSlice';
export const store = configureStore({
  reducer: {
    task: taskReducer,
    column: columnReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
