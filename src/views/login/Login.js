import {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import {Link, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'components/button/Button';
import InputContainer from 'components/input-container/InputContainer';
import {clearJustRegistered, login} from 'redux/actions/tasksActions';
import styles from './Login.module.css';

const required = (value) => (!value ? '* Campo requerido' : undefined);

export default function Login() {
  const dispatch = useDispatch();
  const {loggedIn, username, justRegistered} = useSelector((state) => state);

  if (justRegistered) dispatch(clearJustRegistered());

  const onSubmit = async (values) => dispatch(login(values));

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
