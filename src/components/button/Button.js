import React from 'react';
import styles from './Button.module.css';

export default function Button({
  action = () => {},
  type = '',
  size = 'medium',
  disabled = false,
  children,
  marginX,
  marginY,
}) {
  const margins = {
    ...(marginX && { marginX: '0 10px' }),
    ...(marginY && { marginY: '10px 0' }),
  };
  return (
    <button
      style={{ margin: margins['marginX'] || margins['marginY'] || 0 }}
      onClick={action}
      type={type}
      disabled={disabled}
      className={`${styles.button} ${styles[size]}`}
    >
      {children}
    </button>
  );
}
