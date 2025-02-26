import { getUserTasks } from '@/features/task-list/api/getUserTasks';
import { Task } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TaskState {
  taskList: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  taskList: [],
  loading: false,
  error: null,
};

//非同期処理の定義
export const fetchTasks = createAsyncThunk(
  'task/fetchTasks',
  async ({ token }: { token: string }) => {
    const tasks = await getUserTasks(token);
    return tasks;
  }
);

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
  /* Reducerの魔改造(ReduxThunkの非同期処理を追加)
    本来dispatcherにはプレーンなオブジェクトを渡すが
    createAsyncThunkを使うと非同期処理を追加できる
  */
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.taskList = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'タスクの取得に失敗しました';
      });
  },
});

export const { initializeTask, addTask, deleteTask, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
