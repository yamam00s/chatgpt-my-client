import { FC } from 'react';

import styles from './Textarea.module.css';

export interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
}

export const Textarea: FC<TextareaProps> = ({ value, onChange, className, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`${styles.defaultTextarea} ${className}`}
      placeholder={placeholder}
    />
  );
};
