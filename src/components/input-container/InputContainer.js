import React from 'react';
import styles from './InputContainer.module.css';

export default function InputContainer({
  field: {name, value, onChange, onBlur},
  form: {
    touched: {[name]: touched},
    errors: {[name]: errMsg},
    setFieldError,
  },
  className = styles.inputContainer,
  type = 'text',
  children,
}) {
  return (
    <div className={className}>
      <label htmlFor={name}>{children}</label>
      <input
        id={name}
        type={type}
        className={`${styles.input} ${touched && errMsg && styles.error}`}
        onFocus={() => setFieldError(name, false)}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className={styles.errorMsg}>{touched && errMsg}&nbsp;</span>
    </div>
  );
}
