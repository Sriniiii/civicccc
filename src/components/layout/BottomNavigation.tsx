import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Plus, List, User } from 'lucide-react';
import { cn } from '../../utils/cn';

const tabs = [
  { id: 'dashboard', path: '/', label: 'Home', icon: Home },
  { id: 'map', path: '/map', label: 'Map', icon: Map },
  { id: 'report', path: '/report', label: 'Report', icon: Plus, isMainAction: true },
  { id: 'issues', path: '/issues', label: 'Issues', icon: List },
  { id: 'profile', path: '/profile', label: 'Profile', icon: User },
];

export const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const getActiveTab = () => {
    const currentPath = location.pathname;
    if (currentPath === '/') return 'dashboard';
    const activeTab = tabs.find(tab => currentPath.startsWith(tab.path) && tab.path !== '/');
    return activeTab ? activeTab.id : 'dashboard';
  }

  const activeTab = getActiveTab();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ id, path, label, icon: Icon, isMainAction }) => {
          const isActive = activeTab === id;
          
          if (isMainAction) {
            return (
              <Link
                key={id}
                to={path}
                className="flex flex-col items-center justify-center p-2 min-w-[60px] group"
                aria-label={label}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-civic-lg transform transition-all duration-200 group-active:scale-95 animate-bounce-gentle">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-medium text-primary-500 mt-1">
                  {label}
                </span>
              </Link>
            );
          }
          
          return (
            <Link
              key={id}
              to={path}
              className={cn(
                'flex flex-col items-center justify-center p-2 min-w-[60px] transition-all duration-200',
                'hover:bg-gray-50 rounded-xl active:scale-95',
                {
                  'text-primary-500': isActive,
                  'text-text-secondary': !isActive,
                }
              )}
              aria-label={label}
            >
              <div className={cn(
                'p-2 rounded-xl transition-all duration-200',
                {
                  'bg-primary-100': isActive,
                  'bg-transparent': !isActive,
                }
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={cn(
                'text-xs font-medium mt-1',
                {
                  'text-primary-500': isActive,
                  'text-text-secondary': !isActive,
                }
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
