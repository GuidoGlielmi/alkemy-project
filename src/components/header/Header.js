import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { Outlet } from 'react-router-dom';
export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  }

  return (
    <>
      <header className={styles.header}>
        <span className={styles.logo}>Go Scrum</span>
        <div onClick={handleLogout}>X</div>
      </header>
      <Outlet />
    </>
  );
}
