import { FC } from 'react'
import { ChangeEvent, FormEvent } from 'react'
import { Message } from '../types'

export interface ChatProps {
  prompt: string
  messages: Message[]
  handleSubmit: (event: FormEvent) => Promise<void>
  handleTextareaChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const Chat: FC<ChatProps> = ({ prompt, messages, handleSubmit, handleTextareaChange}) => {

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
