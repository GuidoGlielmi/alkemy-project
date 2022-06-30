import { useContext } from 'react';
import InputContainer from '../../input-container/InputContainer';
import { Formik, Form, Field } from 'formik';
import Button from '../../button/Button';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { api } from 'components/auth-context/AuthContext';

import { authContext } from 'components/auth-context/AuthContext';
function isValidEmail(email) {
  let error;
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) error = 'Ingrese un email válido';
  return error;
}
function isValidPassword(password) {
  let error;
  if (!/^[a-zA-Z]{5,}$/.test(password)) {
    error = 'La contraseña debe tener una letra minúscula, una mayúscula, un número y un símbolo';
  }
  return error;
}

export default function Login() {
  const { setToken } = useContext(authContext);
  const navigate = useNavigate();

  async function onSubmit(values) {
    try {
      const {
        data: {
          result: { token },
        },
      } = await api.post('/auth/login', values);
      setToken(token);
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.form}>
      <Formik
        initialValues={{ userName: '', password: '' }}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        <Form>
          <h1>Iniciar sesión</h1>
          <Field
            name='userName'
            component={InputContainer}
            validate={isValidEmail}
            placeholder='Ingrese su email'
            type='email'
          >
            Email
          </Field>
          <Field
            name='password'
            component={InputContainer}
            validate={isValidPassword}
            placeholder='Ingrese su contraseña'
            type='password'
          >
            Contraseña
          </Field>
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
