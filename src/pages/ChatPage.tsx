import React, { useState, useRef, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Send, ArrowLeft } from 'lucide-react';
import { useChat, ChatMessage } from '../hooks/useChat';
import { cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { messages, isLoading, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    sendMessage(inputValue);
    setInputValue('');
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <PageLayout title="AI Assistant" showBottomNav={false}>
      <div className="flex flex-col h-[calc(100vh-65px)]">
        <div className="p-4 border-b">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn('flex items-end gap-3', {
                'justify-end': message.sender === 'user',
                'justify-start': message.sender === 'ai',
              })}
            >
              {message.sender === 'ai' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn('max-w-xs md:max-w-md p-3 rounded-2xl', {
                  'bg-primary-500 text-white rounded-br-lg': message.sender === 'user',
                  'bg-gray-100 text-text-primary rounded-bl-lg': message.sender === 'ai',
                })}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-3 justify-start">
                <Avatar className="w-8 h-8"><AvatarFallback>AI</AvatarFallback></Avatar>
                <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-lg">
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-surface">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Ask about an issue..."
              className="flex-1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button size="icon" onClick={handleSend} disabled={isLoading || !inputValue.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPage;
