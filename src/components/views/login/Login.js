import { useState, useContext } from 'react';
import InputContainer from '../../input-container/InputContainer';
import { Formik, Form, Field } from 'formik';
import Button from '../../button/Button';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { api } from 'components/auth-context/AuthContext';
import { authContext } from 'components/auth-context/AuthContext';
export default function Login() {
  const { setToken, setUserName, setPassword, password, userName } = useContext(authContext);
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const required = (value) => (!value ? '* Campo requerido' : undefined);

  async function onSubmit(values) {
    setError(false);
    try {
      const {
        data: {
          result: { token },
        },
      } = await api.post('/auth/login', values);
      setToken(token);
      setUserName(values.userName);
      setPassword(values.password);
      navigate('/', { replace: true });
    } catch ({ response: { status } }) {
      if (status === 404) setError(true);
    }
  }
  return (
    <div className={styles.form}>
      <Formik initialValues={{ userName, password }} validateOnChange={false} onSubmit={onSubmit}>
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
