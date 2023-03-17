'use client'

import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { fetchOpenai, FetchOpenaiResponse } from '../api/fetchOpenai'

type Role = 'user' | 'gpt'
type Message = {
  id: number,
  role: Role,
  text: FetchOpenaiResponse
}

export const Chat = () => {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [messageId, setMessageId] = useState(0)

  const addMessage = useCallback((role: Role, text: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: messageId, role, text}
    ]);
    setMessageId((prevCounter) => prevCounter + 1)
  }, [messageId, setMessages])

  const handleTextareaChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value)
  }, [setPrompt])

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    addMessage('user', prompt)
    // const response: FetchOpenaiResponse = await fetchOpenai(message)
    const response: FetchOpenaiResponse = 'hello'
    addMessage('gpt', response)
    setPrompt('')
  }, [prompt, addMessage])

  return (
    <div className='chat'>
      <form onSubmit={handleSubmit}>
        <textarea value={prompt} onChange={handleTextareaChange} />
        <button type='submit'>submit</button>
      </form>

      <div className='messages'>
        {messages.map(message => (
          <p key={message.id}>
            {message.role}: {message.text}
          </p>
        ))}
      </div>
    </div>
  )
}
