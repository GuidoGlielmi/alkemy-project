import {useEffect} from 'react';
import {Switch, FormControlLabel} from '@mui/material';
import {Formik, Field} from 'formik';
import {Link, Navigate} from 'react-router-dom';
import * as yup from 'yup';
import {v4 as uuid} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import InputContainer from 'components/input-container/InputContainer';
import Button from 'components/button/Button';
import Select from 'components/input-container/Select';
import {getFormInfo, register, clearJustRegistered} from 'redux/actions/tasksActions';
import styles from './Register.module.css';

const REQUIRED_MSG = '* Campo obligatorio';
const EMAIL_MSG = 'Ingrese un email válido';
const getMinLengthMsg = (n) => `Ingrese más de ${n - 1} caracteres`;

export default function Register() {
  const dispatch = useDispatch();
  const {roles, continents, regions, justRegistered, teamID} = useSelector((state) => state);

  useEffect(() => void dispatch(getFormInfo()), [dispatch]);
  const initialValues = {
    userName: '',
    email: '',
    password: '',
    role: '',
    teamID,
    continent: '',
    region: '',
    registered: false,
  };

  const validationSchema = () =>
    yup.object().shape({
      userName: yup.string().min(4, getMinLengthMsg(6)).required(REQUIRED_MSG),
      password: yup.string().min(6, getMinLengthMsg(6)).required(REQUIRED_MSG),
      email: yup.string().email(EMAIL_MSG).required(REQUIRED_MSG),
      role: yup.string().required(REQUIRED_MSG),
      continent: yup.string().required(REQUIRED_MSG),
      registered: yup.boolean(),
      teamID: yup.string().when('registered', {
        is: (registered) => registered,
        then: yup.string().required(REQUIRED_MSG),
        otherwise: yup.string(),
      }),
      region: yup.string().when('continent', {
        is: (continent) => continent === 'America',
        then: yup.string().required(REQUIRED_MSG),
        otherwise: yup.string(),
      }),
    });

  function onSubmit(values) {
    const user = {
      ...values,
      teamID: values.registered ? values.teamID : uuid(),
      region: values.continent === 'America' ? values.region : 'Otro',
    };
    delete user.registered;

    dispatch(register(user));
    // 0ea9502e-43af-4594-b2ea-396b6ea00638 guido1 123456
  }

  if (justRegistered) return <Navigate to='/login' />;

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {({handleSubmit, values, setFieldValue}) => (
          <form onSubmit={handleSubmit}>
            <h1>Registro</h1>
            <Field
              name='userName'
              component={InputContainer}
              placeholder='Ingrese su nombre de usuario'
            >
              Nombre de usuario
            </Field>
            <Field
              name='password'
              component={InputContainer}
              placeholder='Ingrese su contraseña'
              type='password'
            >
              Contraseña
            </Field>
            <Field
              name='email'
              component={InputContainer}
              placeholder='Ingrese su email'
              type='email'
            >
              Email
            </Field>
            <Field
              name='role'
              placeholder='Seleccione qué miembro es'
              component={Select}
              options={roles}
            >
              Tipo de miembro
            </Field>
            <Field
              name='continent'
              placeholder='Seleccione su continente'
              component={Select}
              options={continents}
            >
              Continente
            </Field>
            {values.continent === 'America' && (
              <Field
                name='region'
                placeholder='Seleccione su región'
                component={Select}
                options={regions}
              >
                Región
              </Field>
            )}
            <FormControlLabel
              control={
                <Switch
                  value={values.registered}
                  onChange={() => setFieldValue('registered', !values.registered)}
                  name='registered'
                />
              }
              label='Pertenecés a un equipo ya registrado'
            />
            {values.registered && (
              <Field
                name='teamID'
                placeholder='Ingrese el identificador de equipo'
                component={InputContainer}
              >
                Identificador de equipo
              </Field>
            )}
            <Link to='/login'>Ya tiene una cuenta?</Link>
            <Button type='submit'>Enviar</Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

/* 
dirty: true
​
errors: Object { userName: "* Campo obligatorio", password: "* Campo obligatorio", email: "* Campo obligatorio", … }
​
getFieldHelpers: function getFieldHelpers(name)​
getFieldMeta: function getFieldMeta(name)​
getFieldProps: function getFieldProps(nameOrOptions)​
handleBlur: function useEventCallback()​
handleChange: function useEventCallback()​
handleReset: function useEventCallback()​
handleSubmit: function useEventCallback()​
initialErrors: Object {  }
​
initialStatus: undefined
​
initialTouched: Object {  }
​
initialValues: Object { username: "", email: "", password: "", … }
​
isSubmitting: false
​
isValid: false
​
isValidating: false
​
registerField: function registerField(name, _ref3)​
resetForm: function resetForm(nextState)​
setErrors: function setErrors(errors)​
setFieldError: function setFieldError(field, value)​
setFieldTouched: function useEventCallback()​
setFieldValue: function useEventCallback()​
setFormikState: function setFormikState(stateOrCb)​
setStatus: function setStatus(status)​
setSubmitting: function setSubmitting(isSubmitting)​
setTouched: function useEventCallback()​
setValues: function useEventCallback()
​
status: undefined
​
submitCount: 0
​
submitForm: function useEventCallback()​
touched: Object { continent: true, region: true }
​
unregisterField: function unregisterField(name)​
validateField: function useEventCallback()​
validateForm: function useEventCallback()
​
validateOnBlur: true
​
validateOnChange: false
​
validateOnMount: false
​
values: Object { username: "", email: "", continent: "America", … }

*/
