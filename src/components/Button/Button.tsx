import { FC } from 'react';

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: FC<ButtonProps> = ({ onClick, children, className, disabled, type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${className}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
