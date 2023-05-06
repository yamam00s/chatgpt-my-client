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
      className={`flex-grow bg-gray-800 text-gray-200 p-2 border-none outline-none rounded ${className}`}
      placeholder={placeholder}
    />
  );
};
