import React from 'react';
import styles from './InputContainer.module.css';

export default function InputContainer({
  field, // { name, value, onChange, onBlur }
  form: {
    touched: {[field.name]: touched},
    errors: {[field.name]: errMsg},
  },
  className = styles.inputContainer,
  type = 'text',
  children,
  ...props
}) {
  return (
    <div className={className}>
      <label htmlFor={field.name}>{children}</label>
      <input
        id={field.name}
        type={type}
        className={`${styles.input} ${touched && errMsg && styles.error}`}
        {...field}
        {...props}
      />
      <span className={styles.errorMsg}>{touched && errMsg}&nbsp;</span>
    </div>
  );
}
