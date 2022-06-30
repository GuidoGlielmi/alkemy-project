import InputContainer from 'components/input-container/InputContainer';
import Select from 'components/input-container/Select';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import styles from './TaskForm.module.css';
import Button from 'components/button/Button';
import { api } from 'components/auth-context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
export default function TaskForm({ statuses, priorities, addTask }) {
  const initialValues = {
    title: '',
    status: '',
    importance: '',
    description: '',
  };
  const REQUIRED_MSG = '* Campo obligatorio';
  const getMinLengthMsg = (n) => `Ingrese más de ${n - 1} caracteres`;
  const validationSchema = () =>
    yup.object().shape({
      title: yup.string().min(6, getMinLengthMsg(6)).required(REQUIRED_MSG),
      status: yup.string().required(REQUIRED_MSG),
      importance: yup.string().required(REQUIRED_MSG),
      description: yup.string().required(REQUIRED_MSG),
    });

  async function onSubmit(values, { resetForm }) {
    try {
      const {
        data: {
          result: { task: createdTask },
        },
      } = await api.post('/task', { task: { ...values } });
      addTask(createdTask);
      resetForm();
      toast('Tarea creada satisfactoriamente');
    } catch (err) {
      toast.error('No se ha podido crear la tarea');
      console.log(err);
    }
  }
  return (
    <section className={styles.formContainer}>
      <h2>Crear tarea</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
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
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Descripción</label>
                <Field
                  name='description'
                  as='textarea'
                  placeholder='Ingrese una descripción'
                  cols='30'
                  rows='10'
                >
                  Prioridad
                </Field>
              </div>
            </div>
            <Button>Enviar</Button>
          </form>
        )}
      </Formik>
    </section>
  );
}
