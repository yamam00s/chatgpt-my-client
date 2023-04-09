import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';
import { mockResponse } from '@/mocks/handlers';
import { server } from '@/mocks/server';

import { ChatContainer } from './ChatContainer';

const mockResponseText = mockResponse.choices[0].message.content;
const inputMessage = 'test message';

describe('ChatContainer', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('メッセージを送信し、送信メッセージとレスポンスを表示する', async () => {
    const { getByText, getByPlaceholderText } = render(<ChatContainer />);
    const input = getByPlaceholderText('Type your message...');
    const sendButton = getByText('submit');

    fireEvent.change(input, { target: { value: inputMessage } });
    fireEvent.click(sendButton);
    await waitFor(() => {
      return screen.getByText(`system: ${mockResponseText}`);
    });
    expect(screen.getByText(`user: ${inputMessage}`)).toBeInTheDocument();
    expect(screen.getByText(`system: ${mockResponseText}`)).toBeInTheDocument();
  });
});
