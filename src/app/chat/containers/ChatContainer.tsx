'use client'
import { FC } from 'react'
import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { ChatGPTResponse, retrieveChatGPTResponse } from '../api/retrieveChatGPTResponse'
import { Chat, ChatProps } from '../components/Chat'
import { Role, Message } from '../types'
// TODO Initの場所を再検討
import '@/mocks/index'

export const ChatContainer: FC = () => {
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

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    addMessage('user', prompt)
    const response: ChatGPTResponse = await retrieveChatGPTResponse(prompt)
    addMessage('gpt', response)
    setPrompt('')
  }, [prompt, addMessage])

  const handleTextareaChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value)
  }, [setPrompt])

  const props: ChatProps = {
    prompt,
    messages,
    handleSubmit,
    handleTextareaChange
  }

  return (
    <Chat {...props} />
  )
}
