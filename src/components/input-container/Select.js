import React from 'react';
import styles from './InputContainer.module.css';

export default function Select({
  field: {name, value, onChange, onBlur},
  form: {
    touched: {[name]: touched},
    errors: {[name]: errMsg},
    setFieldError,
  },
  options,
  placeholder,
  type = 'text',
  className = styles.inputContainer,
  children,
}) {
  return (
    <div className={className}>
      <label htmlFor={name}>{children}</label>
      <select
        id={name}
        type={type}
        className={touched && errMsg && styles.error}
        onFocus={() => setFieldError(name, false)}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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
