import {Formik, Field, Form, FormikHelpers} from 'formik';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {ITask} from 'services/goScrum';
import {addTask} from 'redux/actions/tasksActions';
import Select from 'components/input-container/Select';
import InputContainer from 'components/input-container/InputContainer';
import Button from 'components/button/Button';
import {getMinLengthMsg} from 'views/register/Register';
import styles from './TaskForm.module.css';

const REQUIRED_MSG = '* Campo obligatorio';
const validationSchema = () =>
  yup.object().shape({
    title: yup.string().min(6, getMinLengthMsg(6)).required(REQUIRED_MSG),
    status: yup.string().required(REQUIRED_MSG),
    importance: yup.string().required(REQUIRED_MSG),
    description: yup.string().required(REQUIRED_MSG),
  });

const initialValues: ITask = {
  title: '',
  status: '',
  importance: '',
  description: '',
};

export default function TaskForm() {
  const dispatch = useAppDispatch();
  const {status: statuses, importance: priorities} = useAppSelector((state) => state);
  const onSubmit = (values: ITask, {resetForm}: FormikHelpers<ITask>) =>
    dispatch(addTask(values, resetForm));

  return (
    <section className={styles.formContainer}>
      <h2>Crear tarea</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        <Form>
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
        </Form>
      </Formik>
    </section>
  );
}
