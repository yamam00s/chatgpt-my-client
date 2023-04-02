import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';

import { Chat, ChatProps } from './Chat';

describe('Chat Components', () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleTextareaChange = jest.fn();

  const testProps: ChatProps = {
    prompt: 'test',
    messages: [
      { id: '1', role: 'user', text: 'Hello' },
      { id: '2', role: 'gpt', text: 'Hi there!' }
    ],
    handleSubmit: mockHandleSubmit,
    handleTextareaChange: mockHandleTextareaChange
  };

  beforeEach(() => {
    render(<Chat {...testProps} />);
  });

  it('メッセージが正しく表示されている', () => {
    const { messages } = testProps;
    expect(screen.getByText(`${messages[0].role}: ${messages[0].text}`));
    expect(screen.getByText(`${messages[1].role}: ${messages[1].text}`));
  });

  it('ButtonへのSubmitEventが正しく動作している', () => {
    const sendButton = screen.getByText('submit');
    fireEvent.submit(sendButton);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('TextareaへのChangeEventが正しく動作している', () => {
    const textarea = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(textarea, { target: { value: 'testing textarea change' } });
    expect(mockHandleTextareaChange).toHaveBeenCalled();
  });
});
