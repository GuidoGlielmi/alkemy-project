// import { useState, useEffect } from 'react';
import InputContainer from '../../input-container/InputContainer';
import { Formik, Form, Field } from 'formik';
import Button from '../../button/Button';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  function onSubmit() {
    localStorage.setItem('logged', 'yes');
    navigate('/', { replace: true });
  }
  return (
    <div className={styles.form}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        <Form>
          <h1>Iniciar sesión</h1>
          <Field
            name='email'
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
