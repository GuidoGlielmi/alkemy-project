import Card from 'components/card/Card';
import styles from './Tasks.module.css';

export default function Tasks() {
  return (
    <main id='tasks'>
      <section className={styles.tasksContainer}>
        <h2>Mis Tareas</h2>
        <div className={styles.tasks}>{Array(10).fill(<Card />)}</div>
      </section>
    </main>
  );
}
