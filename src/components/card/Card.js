import Button from 'components/button/Button';
import { useState, useMemo, useContext } from 'react';
import { loadingContext } from 'components/loading-context/LoadingContext';
import { api } from 'components/auth-context/AuthContext';
import { toast } from 'react-toastify';
import styles from './Card.module.css';

const formatDate = (date) => new Date().toString(date).split('(')[0];
export default function Card({
  task: {
    _id,
    title,
    status,
    importance,
    createdAt,
    modifiedAt,
    // deletedAt,
    // deleted,
    description,
    user,
  },
  priorities,
  statuses,
  setTasks,
}) {
  const { setIsLoading } = useContext(loadingContext);

  const [isLongDescriptionShown, setIsLongDescriptionShown] = useState(false);
  const formattedCreationTime = useMemo(() => formatDate(createdAt), [createdAt]);
  const formattedModificationTime = useMemo(() => formatDate(modifiedAt), [modifiedAt]);

  async function deleteTask() {
    setIsLoading(true);
    try {
      await api.delete(`/task/${_id}`);
      setTasks((pt) => pt.filter((t) => t._id !== _id));
      toast('Se ha eliminado la tarea satisfactoriamente');
    } catch (err) {
      toast.error('No se ha podido eliminar la tarea');
    }
    setIsLoading(false);
  }

  async function updatePriority() {
    setIsLoading(true);
    const currentIndex = priorities.findIndex(({ title }) => title === importance);
    const newPriority =
      currentIndex + 1 === priorities.length
        ? priorities[0].title
        : priorities[currentIndex + 1].title;
    try {
      await api.patch(`/task/${_id}`, { task: { importance: newPriority } });
      setTasks((pt) => pt.map((t) => (t._id === _id ? { ...t, importance: newPriority } : t)));
    } catch (err) {
      toast.error('No se ha podido actualizar la tarea');
    }
    setIsLoading(false);
  }

  async function updateStatus() {
    setIsLoading(true);
    const currentIndex = statuses.findIndex(({ title }) => title === status);
    const newStatus =
      currentIndex + 1 === statuses.length ? statuses[0].title : statuses[currentIndex + 1].title;
    try {
      await api.patch(`/task/${_id}`, { task: { status: newStatus } });
      // seems like strictMode doesn't like impure functions directly modifying state, so methods like splice or push are discouraged. This is checked by running the setState's callback argument twice.
      setTasks((pt) => pt.map((t) => (t._id === _id ? { ...t, status: newStatus } : t)));
    } catch (err) {
      toast.error('No se ha podido actualizar la tarea');
    }
    setIsLoading(false);
  }

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
        <Button size='small' action={updateStatus}>
          {status}
        </Button>
        <Button size='small' action={updatePriority}>
          {importance}
        </Button>
      </div>
      <button
        type='button'
        onClick={() => description.length > 100 && setIsLongDescriptionShown((ps) => !ps)}
        style={{ cursor: description.length > 100 ? 'pointer' : 'default' }}
      >
        {description.length < 100 || isLongDescriptionShown
          ? description
          : `${description.slice(0, 99)}...`}
      </button>
      <button id='delete' type='button' onClick={deleteTask}>
        X
      </button>
    </div>
  );
}
// rgb(134, 246, 239)
// rgb(223, 86, 139)
/* background: `linear-gradient(rgb(59, 59, 59), rgb(29, 29, 29)) padding-box, linear-gradient(to right, #${Math.floor(
          Math.random() * 16777215,
        ).toString(16)}, #928dab) border-box`,  */
