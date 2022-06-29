import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('logged');
    navigate('/', { replace: true });
  }

  return (
    <header className={styles.header}>
      <span className={styles.logo}>Go Scrum</span>
      <div onClick={handleLogout}>X</div>
    </header>
  );
}
