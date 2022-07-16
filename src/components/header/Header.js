import {Outlet} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout} from 'redux/actions/tasksActions';
import styles from './Header.module.css';

export default function Header() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
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
