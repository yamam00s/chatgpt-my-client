import { FC } from 'react';

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
      className={`resize-none p-2 border border-gray-300 rounded ${className}`}
      placeholder={placeholder}
    />
  );
};
