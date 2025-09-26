import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

export const ChatBubble: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/chat')}
      className="fixed bottom-24 right-4 w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-float z-50 transform transition-transform hover:scale-110 active:scale-100"
      aria-label="Open AI Assistant"
    >
      <MessageSquare className="w-8 h-8 text-white" />
    </button>
  );
};
