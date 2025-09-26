import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import { IconButton } from '../ui/IconButton';

export interface HeaderProps {
  title?: string;
  showNotifications?: boolean;
  showProfile?: boolean;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Civic Pulse',
  showNotifications = true,
  showProfile = true,
  children
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-surface border-b border-border safe-top sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Logo/Title */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2" onClick={() => navigate('/')} role="button">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">CP</span>
            </div>
            <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
          </div>
        </div>

        {/* Center - Custom content */}
        {children && (
          <div className="flex-1 mx-4">
            {children}
          </div>
        )}

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {showNotifications && (
            <IconButton
              variant="ghost"
              size="md"
              onClick={() => navigate('/notifications')}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </IconButton>
          )}
          
          {showProfile && (
            <IconButton
              variant="ghost"
              size="md"
              onClick={() => navigate('/profile')}
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </IconButton>
          )}
        </div>
      </div>
    </header>
  );
};
