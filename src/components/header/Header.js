import { useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { authContext } from 'components/auth-context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { clearLogin } = useContext(authContext);
  const navigate = useNavigate();

  function handleLogout() {
    clearLogin();
    navigate('/', { replace: true });
  }

  return (
    <>
      <header className={styles.header}>
        <span className={styles.logo}>Go Scrum</span>
        <button type='button' onClick={handleLogout}>
          X
        </button>
      </header>
      <Outlet />
    </>
  );
}
