import { rest } from 'msw';
import { OPENAI_API_URL } from '@/constants';

export const handlers = [
  rest.post(OPENAI_API_URL, (req, res, ctx) => {
    const mockResponse = {
      id: 'chatcmpl-123',
      object: 'chat.completion',
      created: 1677652288,
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: '\n\n mock response'
          },
          finish_reason: 'stop'
        }
      ],
      usage: {
        prompt_tokens: 9,
        completion_tokens: 12,
        total_tokens: 21
      }
    };
    return res(ctx.status(200), ctx.json(mockResponse));
  })
];
