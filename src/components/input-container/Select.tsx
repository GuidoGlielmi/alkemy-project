import styles from './InputContainer.module.css';
import {IInput} from './InputContainer';

interface Option {
  title: string;
  value: string;
}

interface ISelect extends IInput {
  options: string[] | Option[];
  placeholder: string;
}

export default function Select({
  field: {name, value, onChange, onBlur},
  form: {
    touched: {[name]: touched},
    errors: {[name]: errMsg},
    setFieldError,
  },
  options,
  placeholder,
  className = styles.inputContainer,
  children,
}: ISelect) {
  return (
    <div className={className}>
      <label htmlFor={name}>{children}</label>
      <select
        id={name}
        className={touched && errMsg && styles.error}
        onFocus={() => setFieldError(name, '')}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option value='' disabled>
          {placeholder || children}
        </option>
        {options.map((opt: any) => (
          <option key={opt.title || opt} value={opt.value || opt}>
            {opt.title || opt}
          </option>
        ))}
      </select>
      {touched && errMsg ? (
        <span className={styles.errorMsg}>{errMsg as string}</span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
