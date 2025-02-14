import React from 'react';
import { Outlet } from 'react-router-dom';
import LayoutHeader from '../organisms/LayoutHeader';
import { HEADER_HEIGHT } from '@/constants';
import { cn } from '@/lib/utils';
import { FC } from 'react';
interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className={cn(`mb-[${HEADER_HEIGHT}px]`)}>
        <LayoutHeader />
      </div>
      <Outlet /> {/* ルートの子要素をここにレンダリング */}
      {children} {/* 他のネストされた要素を表示 */}
    </div>
  );
};

export default AppLayout;
