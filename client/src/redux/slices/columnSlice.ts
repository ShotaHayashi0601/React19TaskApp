import { defaultColumns } from '@/constants/columns';
import { Column } from '@/types/column';
import { arrayMove } from '@dnd-kit/sortable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ColumnState {
  columns: Column[];
}

const initialState: ColumnState = {
  columns: defaultColumns,
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    /**
     * カラム一覧を全置き換え
     * 例: サーバーからGETしてきた最新のデータをセットする
     */
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },

    /**
     * 既存カラム1件を更新
     */
    updateColumn: (state, action: PayloadAction<Column>) => {
      const updated = action.payload;
      const index = state.columns.findIndex((c) => c.id === updated.id);
      if (index !== -1) {
        state.columns[index] = updated;
      }
    },

    /**
     * カラムを追加
     */
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload);
    },

    /**
     * カラムを削除
     */
    removeColumn: (state, action: PayloadAction<string>) => {
      // payloadに受け取ったidのカラムを削除
      state.columns = state.columns.filter((c) => c.id !== action.payload);
    },

    /**
     * カラム配列を並び替える
     * arrayMoveを使用し、oldIndex -> newIndexへ移動
     */
    reorderColumns: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      state.columns = arrayMove(state.columns, oldIndex, newIndex);
      // orderを振り直す例
      state.columns.forEach((col, i) => {
        col.order = i + 1;
      });
    },
  },
});

// Slice内のアクションをエクスポート
export const {
  setColumns,
  updateColumn,
  addColumn,
  removeColumn,
  reorderColumns,
} = columnSlice.actions;

// SliceのReducerをエクスポート
export default columnSlice.reducer;
