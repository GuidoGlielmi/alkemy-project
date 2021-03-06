import Card from 'components/card/Card';
import React from 'react';
import styles from './TaskGroup.module.css';

export default function TaskGroup({status, tasks}) {
  return (
    <div className={styles.group}>
      <h3>{status}</h3>
      <div>
        {tasks.map((t) => (
          <Card key={t._id} task={t} />
        ))}
      </div>
    </div>
  );
}
