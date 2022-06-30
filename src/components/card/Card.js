import Button from 'components/button/Button';
import { useState, useMemo } from 'react';
import styles from './Card.module.css';
function formatDate(date) {
  const newDate = new Date().toString(date);
  return newDate.slice(0, newDate.indexOf('('));
}
export default function Card({
  task,
  task: {
    _id,
    title,
    status,
    importance,
    createdAt,
    modifiedAt,
    deletedAt,
    deleted,
    description,
    user,
  },
  deleteTask,
}) {
  const [isLongDescriptionShown, setIsLongDescriptionShown] = useState(false);
  const formattedCreationTime = useMemo(() => formatDate(createdAt), [createdAt]);
  const formattedModificationTime = useMemo(() => formatDate(modifiedAt), [modifiedAt]);

  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <time dateTime={formattedCreationTime}>
        <u>Creado</u>: {formattedCreationTime}
      </time>
      <time dateTime={formattedModificationTime}>
        <u>Última modificación</u>: {formattedModificationTime}
      </time>
      <h5>{user.username}</h5>
      <div>
        <Button size='small'>{status}</Button>
        <Button size='small'>{importance}</Button>
      </div>
      <p
        onClick={() => description.length > 100 && setIsLongDescriptionShown((ps) => !ps)}
        style={{ cursor: description.length > 100 ? 'pointer' : 'default' }}
      >
        {description.length < 100 || isLongDescriptionShown
          ? description
          : description.slice(0, 99) + '...'}
      </p>
      <div onClick={() => deleteTask(task)}>X</div>
    </div>
  );
}
// rgb(134, 246, 239)
// rgb(223, 86, 139)
/* background: `linear-gradient(rgb(59, 59, 59), rgb(29, 29, 29)) padding-box, linear-gradient(to right, #${Math.floor(
          Math.random() * 16777215,
        ).toString(16)}, #928dab) border-box`,  */
