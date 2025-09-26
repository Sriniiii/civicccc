import React from 'react';
import { Card } from '../ui/Card';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 safe-top safe-bottom">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-civic-lg mb-4">
            <span className="text-white text-2xl font-bold">CP</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary">
            {title}
          </h1>
          <p className="text-text-secondary mt-2">
            Welcome to Civic Pulse. Let's make a difference.
          </p>
        </div>
        <Card variant="elevated" padding="lg">
          {children}
        </Card>
      </div>
    </div>
  );
};
