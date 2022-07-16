import {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import {Link, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'components/button/Button';
import InputContainer from 'components/input-container/InputContainer';
import {loginRequest} from 'redux/actions/tasksActions';
import styles from './Login.module.css';

export default function Login() {
  const dispatch = useDispatch();
  const {loggedIn, username} = useSelector((state) => state);

  const [error, setError] = useState(false);

  const required = (value) => (!value ? '* Campo requerido' : undefined);

  async function onSubmit(values) {
    dispatch(loginRequest(values));
  }

  if (loggedIn) return <Navigate to='/' />;

  return (
    <div className={styles.form}>
      <Formik
        initialValues={{userName: username, password: ''}}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        <Form>
          <h1>Iniciar sesión</h1>
          <Field
            name='userName'
            validate={required}
            component={InputContainer}
            placeholder='Ingrese su usuario'
          >
            Usuario
          </Field>
          <Field
            name='password'
            component={InputContainer}
            validate={required}
            placeholder='Ingrese su contraseña'
            type='password'
          >
            Contraseña
          </Field>
          {error && <span className={styles.error}>El usuario o contraseña son incorrectos</span>}
          <Button type='submit'>Enviar</Button>
          <Link to='/register'>Cree una cuenta</Link>
        </Form>
      </Formik>
    </div>
  );
}

/* 
const user = {
  userName: '',
  passowrd: '',
  email: '',
  teamID: '', // -> ["Team Member", "Team Leader"]
  role: '', // -> ["America", "Europa", "Otro"]
  continent: '', // -> ["Otro", "Latam", "Brasil", "America del Norte"]
  region: '',
};
 */
