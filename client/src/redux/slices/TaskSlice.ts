import { Task } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

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
    addTask: (state, action) => {
      state.taskList.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload
      );
    },
    updateTask: (state, action) => {
      const index = state.taskList.findIndex(
        (task) => task.id === action.payload.id
      );
      state.taskList[index] = action.payload;
    },
  },
});
export const { addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
