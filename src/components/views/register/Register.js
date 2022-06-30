import { useState, useEffect } from 'react';
import InputContainer from '../../input-container/InputContainer';
import { Formik, Field } from 'formik';
import Button from '../../button/Button';
import styles from './Register.module.css';
import Select from '../../input-container/Select';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import { Switch, FormControlLabel } from '@mui/material';
import { api } from 'components/auth-context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [continents, setContinents] = useState([]);
  const [regions, setRegions] = useState([]);
  useEffect(() => {
    api.get('/auth/data').then(
      ({
        data: {
          result: { Rol, continente, region },
        },
      }) => {
        setRoles(Rol.map((r) => ({ title: r })));
        setContinents(continente.map((c) => ({ title: c })));
        setRegions(region.filter((r) => r !== 'Otro').map((r) => ({ title: r })));
      },
    );
  }, []);
  const initialValues = {
    userName: '',
    email: '',
    password: '',
    role: '',
    teamID: '',
    continent: '',
    region: '',
    registered: false,
  };
  const REQUIRED_MSG = '* Campo obligatorio';
  const EMAIL_MSG = 'Ingrese un email válido';
  const getMinLengthMsg = (n) => `Ingrese más de ${n - 1} caracteres`;
  const validationSchema = () => {
    return yup.object().shape({
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
  };

  async function onSubmit(values) {
    console.log(values);
    const teamID = values.teamID || uuid();
    const user = {
      ...values,
      teamID,
      region: values.continent === 'America' ? values.region : 'Otro',
    };
    delete user.registered;
    try {
      const {
        data: {
          result: { insertedId, user: createdUser },
        },
      } = await api.post('/auth/register', {
        user,
      });
      navigate('/login');
      // 0ea9502e-43af-4594-b2ea-396b6ea00638 guido1 123456
      console.log(insertedId, createdUser);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
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
