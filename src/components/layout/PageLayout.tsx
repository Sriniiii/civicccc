import React from 'react';
import { Header, HeaderProps } from './Header';
import { BottomNavigation } from './BottomNavigation';

export interface PageLayoutProps extends HeaderProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showBottomNav = true,
  className = '',
  ...headerProps
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header {...headerProps} />
      
      <main className={`flex-1 ${showBottomNav ? 'pb-24' : ''} ${className}`}>
        {children}
      </main>
      
      {showBottomNav && <BottomNavigation />}
    </div>
  );
};
