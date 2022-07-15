// import { useContext } from 'react';
import {Outlet} from 'react-router-dom';
// import { authContext } from 'components/auth-context/AuthContext';
import {useDispatch} from 'react-redux';
import {logout} from 'redux/actions/tasksActions';
import styles from './Header.module.css';

export default function Header() {
  const dispatch = useDispatch();
  /*   const { clearLogin } = useContext(authContext);
  const navigate = useNavigate(); */

  function handleLogout() {
    dispatch(logout());
    // clearLogin();
    // navigate('/', { replace: true });
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
