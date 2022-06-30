import Card from 'components/card/Card';
import TaskForm from 'components/task-form/TaskForm';
import styles from './Tasks.module.css';
import { useState, useEffect, Fragment } from 'react';
import { api } from 'components/auth-context/AuthContext';

export default function Tasks() {
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    try {
      const {
        data: {
          result: { status, importance },
        },
      } = api.get('/task/data');
      setStatuses(status.map((s) => ({ title: s })));
      setPriorities(importance.map((i) => ({ title: i })));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <main className={styles.tasksPage}>
      <TaskForm />
      <section className={styles.tasksContainer}>
        <h2>Mis Tareas</h2>
        <div className={styles.tasks}>
          {Array(10)
            .fill(<Card statuses={statuses} priorities={priorities} />)
            .map((el, i) => (
              <Fragment key={i}>{el}</Fragment>
            ))}
        </div>
      </section>
    </main>
  );
}
