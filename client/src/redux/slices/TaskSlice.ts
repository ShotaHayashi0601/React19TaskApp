import { Task } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskState {
  taskList: Task[];
}

const initialState: TaskState = {
  taskList: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    initializeTask: (state, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.taskList.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload
      );
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.taskList.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.taskList[index] = action.payload;
      }
    },
  },
});

export const { initializeTask, addTask, deleteTask, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
