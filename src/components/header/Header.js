import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { Outlet } from 'react-router-dom';
import { authContext } from 'components/auth-context/AuthContext';
export default function Header() {
  const { setToken } = useContext(authContext);
  const navigate = useNavigate();

  function handleLogout() {
    setToken();
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
