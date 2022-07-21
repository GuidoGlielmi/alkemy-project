import React from 'react';
import styles from './InputContainer.module.css';

export default function InputContainer({
  form,
  field, // { name, value, onChange, onBlur }
  form: {
    touched: {[field.name]: touched},
    errors: {[field.name]: errMsg},
    setFieldError,
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
        onFocus={() => setFieldError(field.name, false)}
        {...field}
        {...props}
      />
      <span className={styles.errorMsg}>{touched && errMsg}&nbsp;</span>
    </div>
  );
}
