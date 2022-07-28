import {FieldProps} from 'formik';
import styles from './InputContainer.module.css';

export interface IInput extends FieldProps {
  className?: string;
  type?: string;
  children: string;
}

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
}: IInput) {
  return (
    <div className={className}>
      <label htmlFor={name}>{children}</label>
      <input
        id={name}
        type={type}
        className={`${styles.input} ${touched && errMsg && styles.error}`}
        onFocus={() => setFieldError(name, '')}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touched && errMsg ? (
        <span className={styles.errorMsg}>{errMsg as string}</span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
