import React from 'react';
import styles from './InputContainer.module.css';

export default function Select({
  field, // { name, value, onChange, onBlur }
  form: {
    touched: {[field.name]: touched},
    errors: {[field.name]: errMsg},
    setFieldError,
  },
  options,
  placeholder,
  type = 'text',
  className = styles.inputContainer,
  children,
  ...props
}) {
  return (
    <div className={className}>
      <label htmlFor={field.name}>{children}</label>
      <select
        id={field.name}
        type={type}
        className={touched && errMsg && styles.error}
        onFocus={() => setFieldError(field.name, false)}
        {...field}
        {...props}
      >
        <option value='' disabled>
          {placeholder || children}
        </option>
        {options.map((opt) => (
          <option key={opt.title || opt} value={opt.value || opt}>
            {opt.title || opt}
          </option>
        ))}
      </select>
      <span className={styles.errorMsg}>{touched && errMsg}&nbsp;</span>
    </div>
  );
}
