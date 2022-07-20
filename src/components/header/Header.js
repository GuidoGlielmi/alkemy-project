import {Link, Outlet} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout} from 'redux/actions/tasksActions';
import styles from './Header.module.css';

export default function Header() {
  const dispatch = useDispatch();

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
