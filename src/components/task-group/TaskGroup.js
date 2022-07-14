import Card from 'components/card/Card';
import React from 'react';
import styles from './TaskGroup.module.css';

export default function TaskGroup({status, tasks, setTasks}) {
  return (
    <div className={styles.group} key={status}>
      <h3>{status}</h3>
      <div>
        {tasks.map((t) => (
          <Card key={t._id} task={t} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
}
