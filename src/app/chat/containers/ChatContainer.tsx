'use client';
import { FC, useState, useCallback, ChangeEvent, FormEvent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// import { ChatGPTResponse, Postmessage, retrieveChatGPTResponse } from '../api/retrieveChatGPTResponse';
import { Chat, ChatProps } from '../components/Chat';
import { Postmessage, useChatGPT } from '../hooks/useChatGPT';
import { Role, Message } from '../types';
// TODO Initの場所を再検討
if (process.env.NODE_ENV === 'development') {
  require('@/mocks/index');
}

export const ChatContainer: FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { trigger, data } = useChatGPT();

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
      await trigger({ messages: postMessages, prompt });
      setPrompt('');
    },
    [prompt, addMessage, messages, trigger]
  );

  const handleTextareaChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(event.target.value);
    },
    [setPrompt]
  );

  useEffect(() => {
    if (data) {
      addMessage('system', data);
    }
  }, [addMessage, data]);

  const props: ChatProps = {
    prompt,
    messages,
    handleSubmit,
    handleTextareaChange
  };

  return <Chat {...props} />;
};
