import {Link, Outlet} from 'react-router-dom';
import {logout} from 'redux/tasksSlice';
import {useAppDispatch} from 'redux/hooks';
import styles from './Header.module.css';

export default function Header() {
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(logout());

  return (
    <>
      <header className={styles.header}>
        <span className={styles.logo}>Go Scrum</span>
        <div>
          <Link to='/register'>Registrar a un nuevo miembro</Link>
          <button type='button' onClick={handleLogout} className='buttonSecondary'>
            Cerrar sesión
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
}
