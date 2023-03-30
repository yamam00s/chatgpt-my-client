import { mockResponse } from '@/mocks/handlers';
import { server } from '@/mocks/server';

import { retrieveChatGPTResponse } from '../retrieveChatGPTResponse';

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
    const testPrompt = 'test';
    const response = await retrieveChatGPTResponse(testPrompt);

    expect(response).toEqual(mockResponse.choices[0].message.content);
  });
});
