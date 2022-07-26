import styles from './Button.module.css';

interface IButton {
  action?: () => any;
  type?: 'button' | 'submit' | 'reset';
  size?: string;
  disabled?: boolean;
  color?: string;
  children: string;
}

export default function Button({
  action = () => {},
  type = 'button',
  size = 'medium',
  disabled = false,
  color = 'rgb(36, 36, 36)',
  children,
}: IButton) {
  return (
    <button
      onClick={action}
      type={type}
      disabled={disabled}
      className={`${styles.button} ${styles[size]}`}
      style={{
        background: `linear-gradient(175deg, ${color}, rgb(70, 70, 70)) padding-box, linear-gradient(to right, #ae00ff, #928dab) border-box`,
      }}
    >
      {children}
    </button>
  );
}
