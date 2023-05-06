import useSWRMutation from 'swr/mutation';
import 'whatwg-fetch';

import { OPENAI_API_KEY } from '@/config';
import { OPENAI_API_URL } from '@/constants';

import { Role } from '../types';

export type ChatGPTResponse = string;

export type Postmessage = {
  role: Role;
  content: string;
};

const modelName = 'gpt-3.5-turbo';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${OPENAI_API_KEY}`
};
const fetcher = async (url: string, { arg }: { arg: { messages: Postmessage[]; prompt: string } }) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      model: modelName,
      messages: [...arg.messages, { role: 'user', content: arg.prompt }]
    }),
    headers
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.choices[0].message.content ?? 'no data';
    });
};

export function useChatGPT() {
  const { trigger, data, error, isMutating } = useSWRMutation(OPENAI_API_URL, fetcher, {
    populateCache: true
  });

  return {
    trigger,
    data,
    isMutating,
    isError: error
  };
}
