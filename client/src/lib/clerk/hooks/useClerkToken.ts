// src/hooks/useGetClerkToken.ts
import { setToken } from '@/redux/slices/authSlice';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useClerkToken = () => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; // コンポーネントのマウント状態を追跡

    const fetchToken = async () => {
      try {
        const token = await getToken();
        if (isMounted) {
          dispatch(setToken(token)); // Reduxにトークンを保存
        }
      } catch (error) {
        console.error('トークンの取得に失敗しました:', error);
      }
    };

    // 初回のトークン取得
    fetchToken();

    // トークンの有効期限と更新間隔
    const tokenLifetime = 60000; // 60秒
    const refreshInterval = tokenLifetime - 10000; // 50秒（10秒前に更新）

    // 定期的にトークンを取得するためのインターバル設定
    const intervalId = setInterval(fetchToken, refreshInterval);

    // クリーンアップ関数
    return () => {
      isMounted = false; // コンポーネントがアンマウントされたことを示す
      clearInterval(intervalId); // インターバルのクリア
    };
  }, [getToken, dispatch]);
};
