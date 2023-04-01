import { rest } from 'msw';

import { OPENAI_API_URL } from '@/constants';
import { mockResponse } from '@/mocks/handlers';
import { server } from '@/mocks/server';

import { retrieveChatGPTResponse } from '../retrieveChatGPTResponse';

const testPrompt = 'test';

describe('retrieveChatGPTResponse', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('正しいレスポンスが返却されているか', async () => {
    const response = await retrieveChatGPTResponse(testPrompt);

    expect(response).toEqual(mockResponse.choices[0].message.content);
  });

  it('エラー時に正しいレスポンスが返却されているか', async () => {
    server.use(
      rest.post(OPENAI_API_URL, (req, res, ctx) => {
        return res.once(ctx.status(500), ctx.json({ message: 'エラーが発生しました' }));
      })
    );

    const response = await retrieveChatGPTResponse(testPrompt);
    expect(response).toEqual('エラーが発生しました');
  });
});
