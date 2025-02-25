import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import columnReducer from './slices/columnSlice';
import authReducer from './slices/authSlice';
export const store = configureStore({
  reducer: {
    task: taskReducer,
    column: columnReducer,
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
