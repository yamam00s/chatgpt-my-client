import { FC, ChangeEvent, FormEvent  } from 'react'
import { Button, ButtonProps } from '@/components'
import { Message } from '../types'
import styles from './Chat.module.css'

export interface ChatProps {
  prompt: string
  messages: Message[]
  handleSubmit: (event: FormEvent) => Promise<void>
  handleTextareaChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const Chat: FC<ChatProps> = ({ prompt, messages, handleSubmit, handleTextareaChange}) => (
  <div>
    <div className={styles.chatArea}>
      {messages.map(message => (
        <p className={`${styles.messageCard} ${message.role === 'user' && styles.mine}`} key={message.id}>
          {message.role}: {message.text}
        </p>
      ))}
    </div>

    <form className={styles.inputArea} onSubmit={handleSubmit}>
      <textarea className={styles.messageInput} value={prompt} onChange={handleTextareaChange} />
      <Button type='submit'>submit</Button>
    </form>
  </div>
)

