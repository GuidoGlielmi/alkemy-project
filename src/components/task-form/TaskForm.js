import InputContainer from 'components/input-container/InputContainer';
import Select from 'components/input-container/Select';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import Button from 'components/button/Button';
// import {api} from 'components/auth-context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
// import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {addTask} from 'redux/actions/tasksActions';
import styles from './TaskForm.module.css';

const REQUIRED_MSG = '* Campo obligatorio';
const getMinLengthMsg = (n) => `Ingrese más de ${n - 1} caracteres`;

export default function TaskForm() {
  const dispatch = useDispatch();
  const {statuses, priorities} = useSelector((state) => state);

  const initialValues = {
    title: '',
    status: '',
    importance: '',
    description: '',
  };

  const validationSchema = () =>
    yup.object().shape({
      title: yup.string().min(6, getMinLengthMsg(6)).required(REQUIRED_MSG),
      status: yup.string().required(REQUIRED_MSG),
      importance: yup.string().required(REQUIRED_MSG),
      description: yup.string().required(REQUIRED_MSG),
    });

  async function onSubmit(values, {resetForm}) {
    dispatch(addTask(values, resetForm));
  }

  return (
    <section className={styles.formContainer}>
      <h2>Crear tarea</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={onSubmit}
      >
        {({handleSubmit, errors}) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* {console.log(errors)} */}
            <div>
              <Field name='title' component={InputContainer} placeholder='Ingrese el título'>
                Título
              </Field>
              <Field
                name='status'
                placeholder='Seleccione un estado'
                component={Select}
                options={statuses}
              >
                Estado
              </Field>
              <Field
                name='importance'
                component={Select}
                placeholder='Seleccione una prioridad'
                options={priorities}
              >
                Prioridad
              </Field>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='description'>Descripción</label>
                <Field
                  name='description'
                  as='textarea'
                  placeholder='Ingrese una descripción'
                  cols='30'
                  rows='10'
                  id='description'
                >
                  Prioridad
                </Field>
              </div>
            </div>
            <Button type='submit'>Enviar</Button>
          </form>
        )}
      </Formik>
    </section>
  );
}
