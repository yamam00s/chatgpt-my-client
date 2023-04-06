'use client';
import { FC, useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ChatGPTResponse, Postmessage, retrieveChatGPTResponse } from '../api/retrieveChatGPTResponse';
import { Chat, ChatProps } from '../components/Chat';
import { Role, Message } from '../types';
// TODO Initの場所を再検討
if (process.env.NODE_ENV === 'development') {
  require('@/mocks/index');
}

export const ChatContainer: FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback(
    (role: Role, text: string) => {
      const uniqueId = uuidv4();
      setMessages(prevMessages => {
        return [...prevMessages, { id: uniqueId, role, text }];
      });
    },
    [setMessages]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      addMessage('user', prompt);
      const postMessages: Postmessage[] = messages.map(message => {
        return {
          role: message.role,
          content: message.text
        };
      });
      const response: ChatGPTResponse = await retrieveChatGPTResponse(postMessages, prompt);
      addMessage('system', response);
      setPrompt('');
    },
    [prompt, addMessage, messages]
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
