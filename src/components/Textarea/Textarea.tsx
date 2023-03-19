import { FC } from 'react'
import styles from './Textarea.module.css'

interface TextareaProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  placeholder?: string
}

export const Textarea: FC<TextareaProps> = ({ value, onChange, className, placeholder }) => (
  <textarea
    value={value}
    onChange={onChange}
    className={`${styles.defaultTextarea} ${className}`}
    placeholder={placeholder}
  />
)
