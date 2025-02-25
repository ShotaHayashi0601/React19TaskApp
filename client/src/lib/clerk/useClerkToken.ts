// src/hooks/useGetClerkToken.ts
import { setToken } from '@/redux/slices/authSlice';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useClerkToken = () => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      dispatch(setToken(token)); // Reduxにトークンを保存
    })();
  }, [getToken, dispatch]);
};
