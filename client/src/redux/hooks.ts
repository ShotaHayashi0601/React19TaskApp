import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// 型安全な useDispatch を提供
export const useAppDispatch: () => AppDispatch = useDispatch;

// 型安全な useSelector を提供
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
