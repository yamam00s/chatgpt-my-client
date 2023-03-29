'use client';
import { FC, useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ChatGPTResponse, retrieveChatGPTResponse } from '../api/retrieveChatGPTResponse';
import { Chat, ChatProps } from '../components/Chat';
import { Role, Message } from '../types';
// TODO Initの場所を再検討
import '@/mocks/index';

export const ChatContainer: FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback(
    (role: Role, text: string) => {
      const uniqueId = uuidv4();
      setMessages(prevMessages => {return [...prevMessages, { id: uniqueId, role, text }]});
    },
    [setMessages]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      addMessage('user', prompt);
      const response: ChatGPTResponse = await retrieveChatGPTResponse(prompt);
      addMessage('gpt', response);
      setPrompt('');
    },
    [prompt, addMessage]
  );

  const handleTextareaChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(event.target.value);
    },
    [setPrompt]
  );

  const props: ChatProps = {
    prompt,
    messages,
    handleSubmit,
    handleTextareaChange
  };

  return <Chat {...props} />;
};
