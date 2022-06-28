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
      style={{ fontSize: size }}
      disabled={disabled}
      className={styles.button}
    >
      {children}
    </button>
  );
}
