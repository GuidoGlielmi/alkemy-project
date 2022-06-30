import Card from 'components/card/Card';
import TaskForm from 'components/task-form/TaskForm';
import styles from './Tasks.module.css';
import { useState, useEffect } from 'react';
import { api } from 'components/auth-context/AuthContext';

export default function Tasks() {
  useEffect(() => {
    getData();
  }, []);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [tasks, setTasks] = useState([]);

  async function getData() {
    try {
      const {
        data: {
          result: { status, importance },
        },
      } = await api.get('/task/data');
      setStatuses(status.map((s) => ({ title: s })));
      setPriorities(importance.map((i) => ({ title: i })));
      const {
        data: { result },
      } = await api.get('/task/me');
      setTasks(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={styles.tasksPage}>
      <TaskForm statuses={statuses} priorities={priorities} setTasks={setTasks} />
      <section className={styles.tasksContainer}>
        <h2>Mis Tareas</h2>
        <div className={styles.tasks}>
          {tasks.map((t) => (
            <Card key={t._id} task={t} />
          ))}
        </div>
      </section>
    </main>
  );
}
