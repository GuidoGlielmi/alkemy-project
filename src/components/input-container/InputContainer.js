import React from 'react';
import styles from './InputContainer.module.css';
export default function InputContainer({
  children,
  type = 'text',
  className = styles.inputContainer,
  field, // { name, value, onChange, onBlur }
  form: {
    touched: { [field.name]: touched },
    errors: { [field.name]: errMsg },
  },
  ...props
}) {
  return (
    <div className={className}>
      <label htmlFor={field.name}>{children}</label>
      <input type={type} {...field} {...props} className={styles.input} />
      <span className={styles.error}>{touched && errMsg}&nbsp;</span>
    </div>
  );
}
