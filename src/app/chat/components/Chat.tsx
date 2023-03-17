'use client'

import { useState, useCallback, ChangeEvent } from 'react'
import { fetchOpenai, FetchOpenaiResponse } from '../api/fetchOpenai'

export const Chat = () => {
  const [response, setResponse] = useState('')
  const [message, setMessages] = useState('')

  const handleSubmit = useCallback(async () => {
    const response: FetchOpenaiResponse = await fetchOpenai(message)
    // const response: FetchOpenaiResponse = 'hello'
    setResponse(response)
  }, [message, setResponse])

  const handleTextareaChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessages(event.target.value)
  }, [setMessages])

  return (
    <main>
      <div>{response}</div>
      <textarea value={message} onChange={handleTextareaChange} />
      <button onClick={handleSubmit}>submit</button>
    </main>
  )
}
