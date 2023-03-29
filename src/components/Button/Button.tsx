import { FC } from 'react';

import styles from './Button.module.css';

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: FC<ButtonProps> = ({ onClick, children, className, disabled, type = 'button' }) => {return (
  <button onClick={onClick} className={`${styles.defaultButton} ${className}`} disabled={disabled} type={type}>
    {children}
  </button>
)};
