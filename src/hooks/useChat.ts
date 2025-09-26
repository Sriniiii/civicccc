import { useState, useCallback } from 'react';
import { faker } from '@faker-js/faker';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: faker.string.uuid(),
      text,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: faker.string.uuid(),
        text: `This is a simulated AI response to: "${text}". In a real app, this would come from OpenAI.`,
        sender: 'ai',
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  }, []);

  return { messages, isLoading, sendMessage };
};
