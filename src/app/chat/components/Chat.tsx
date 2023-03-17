'use client'

import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { fetchOpenai, FetchOpenaiResponse } from '../api/fetchOpenai'

export const Chat = () => {
  const [response, setResponse] = useState('')
  const [message, setMessages] = useState('')

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    // const response: FetchOpenaiResponse = await fetchOpenai(message)
    const response: FetchOpenaiResponse = 'hello'
    setResponse(response)
  }, [message, setResponse])

  const handleTextareaChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessages(event.target.value)
  }, [setMessages])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={handleTextareaChange} />
        <button type='submit'>submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  )
}
