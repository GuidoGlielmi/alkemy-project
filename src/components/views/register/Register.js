// import { useState, useEffect } from 'react';
import InputContainer from '../../input-container/InputContainer';
import { Formik, Form, Field } from 'formik';
import Button from '../../button/Button';
import styles from './Register.module.css';
import Select from '../../input-container/Select';

function isValidEmail(email) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ? undefined
    : 'Ingrese un email válido';
}
function isValidPassword(password) {
  return /^[a-zA-Z]{5,}$/.test(password)
    ? undefined
    : 'La contraseña debe tener una letra minúscula, una mayúscula, un número y un símbolo';
}
const hasSelection = (value) => (!value ? 'Seleccione una opción' : undefined);

export default function Register() {
  function onSubmit(values) {
    console.log(values);
  }
  const initialValues = {
    username: '',
    email: '',
    password: '',
    teamID: '',
    continents: '',
    regions: '',
  };
  const memberTypes = [{ title: 'Team Member' }, { title: 'Team Leader' }];
  const continents = [{ title: 'America' }, { title: 'Europa' }, { title: 'Otro' }];
  const regions = [
    {
      title: 'America del Norte',
    },
    {
      title: 'Brasil',
    },
    {
      title: 'Latam',
    },
    {
      title: 'Otro',
    },
  ];
  return (
    <div className={styles.form}>
      <Formik initialValues={initialValues} validateOnChange={false} onSubmit={onSubmit}>
        <Form>
          <h1>Registro</h1>
          <Field
            name='username'
            component={InputContainer}
            placeholder='Ingrese su nombre de usuario'
          >
            Nombre de usuario
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
          <Field
            name='email'
            component={InputContainer}
            validate={isValidEmail}
            placeholder='Ingrese su email'
            type='email'
          >
            Email
          </Field>
          <input type='hidden' name='teamID' value='9cdbd108-f924-4383-947d-8f0c651d0dad' />
          <Field name='teamID' component={Select} validate={hasSelection} options={memberTypes}>
            Seleccione qué miembro es
          </Field>
          <Field name='continents' component={Select} validate={hasSelection} options={continents}>
            Seleccione su continente
          </Field>
          <Field name='regions' component={Select} validate={hasSelection} options={regions}>
            Seleccione su región
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
