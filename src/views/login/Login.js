/* eslint-disable no-unused-vars */
import {useState, useContext} from 'react';
import {authContext, api} from 'components/auth-context/AuthContext';
import {Formik, Form, Field} from 'formik';
import {useNavigate, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'components/button/Button';
import InputContainer from 'components/input-container/InputContainer';
import {loginRequest} from 'redux/actions/tasksActions';
import styles from './Login.module.css';

export default function Login() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(({loggedIn}) => loggedIn);
  const {setToken, setUserName, setPassword, password, userName} = useContext(authContext);
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const required = (value) => (!value ? '* Campo requerido' : undefined);

  async function onSubmit(values) {
    dispatch(loginRequest(values));
    /* setError(false);
    try {
      const {
        data: {
          result: {token},
        },
      } = await api.post('/auth/login', values);
      setToken(token);
      setUserName(values.userName);
      setPassword(values.password);
      navigate('/', {replace: true});
    } catch ({response: {status}}) {
      if (status === 404) setError(true);
    } */
  }

  if (loggedIn) navigate('/' /* {replace: true} */);

  return (
    <div className={styles.form}>
      <Formik initialValues={{userName, password}} validateOnChange={false} onSubmit={onSubmit}>
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
