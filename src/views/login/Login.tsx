import {Formik, Form, Field} from 'formik';
import {Link, Navigate} from 'react-router-dom';
import Button from 'components/button/Button';
import InputContainer from 'components/input-container/InputContainer';
import {clearJustRegistered, login} from 'redux/actions/tasksActions';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import styles from './Login.module.css';

const required = (value) => (!value ? '* Campo requerido' : undefined);

export default function Login() {
  const dispatch = useAppDispatch();
  const {isLoggedIn, userName, justRegistered} = useAppSelector((state) => state);

  const onSubmit = async (values: {userName: string; password: string}) => dispatch(login(values));

  if (justRegistered) dispatch(clearJustRegistered());

  if (isLoggedIn) return <Navigate to='/' />;

  return (
    <div className={styles.form}>
      <Formik initialValues={{userName, password: ''}} validateOnChange={false} onSubmit={onSubmit}>
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
