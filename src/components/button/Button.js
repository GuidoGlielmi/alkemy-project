import React from 'react';
import styles from './Button.module.css';

export default function Button({
  action = () => {},
  type = 'button',
  size = 'medium',
  disabled = false,
  color,
  children,
}) {
  return (
    <button
      onClick={action}
      type={type}
      disabled={disabled}
      className={`${styles.button} ${styles[size]}`}
      style={{
        background: `linear-gradient(${
          color || 'rgb(36, 36, 36)'
        }, rgb(46, 46, 46)) padding-box, linear-gradient(to right, #ae00ff, #928dab) border-box`,
      }}
    >
      {children}
    </button>
  );
}
