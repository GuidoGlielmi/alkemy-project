import React from 'react';
import styles from './Button.module.css';

export default function Button({
  action = () => {},
  type = '',
  size = 'medium',
  disabled = false,
  children,
}) {
  return (
    <button
      onClick={action}
      type={type}
      disabled={disabled}
      className={`${styles.button} ${styles[size]}`}
    >
      {children}
    </button>
  );
}
