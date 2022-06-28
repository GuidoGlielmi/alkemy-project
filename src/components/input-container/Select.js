import React from 'react';
import styles from './InputContainer.module.css';
export default function Select({
  children,
  type = 'text',
  className = styles.inputContainer,
  field, // { name, value, onChange, onBlur }
  form,
  form: {
    touched: { [field.name]: touched },
    errors: { [field.name]: errMsg },
  },
  options,
  ...props
}) {
  return (
    <div className={className}>
      <label htmlFor={field.name}>{children}</label>
      <select type={type} {...field} {...props} defaultValue=''>
        <option value='' disabled>
          {children}
        </option>
        {options.map(({ title, value }, i) => (
          <option key={i} value={value || title}>
            {title}
          </option>
        ))}
      </select>
      <span className={styles.error}>{touched && errMsg}&nbsp;</span>
    </div>
  );
}
