import { OPENAI_API_KEY } from '@/config';
import { OPENAI_API_URL } from '@/constants';

import 'whatwg-fetch';
import { Role } from '../types';

export type ChatGPTResponse = string;
export type Postmessage = {
  role: Role;
  content: string;
};
type RetrieveChatGPTResponse = (message: Postmessage[], prompt: string) => Promise<ChatGPTResponse>;

const modelName = 'gpt-3.5-turbo';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${OPENAI_API_KEY}`
};

export const retrieveChatGPTResponse: RetrieveChatGPTResponse = async (messages: Postmessage[], prompt: string) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        model: modelName,
        messages: [...messages, { role: 'user', content: prompt }]
      }),
      headers
    });
    const result = await response.json();

    return result.choices[0].message.content ?? 'no data';
  } catch (error) {
    console.error(error);
    return 'エラーが発生しました';
  }
};
