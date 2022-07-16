import Button from 'components/button/Button';
import {useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTask, updateTask} from 'redux/actions/tasksActions';
import styles from './Card.module.css';

const colors = ['rgb(219, 0, 0)', 'rgb(200, 200, 0)', 'rgb(38, 0, 219)'];

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
}) {
  const dispatch = useDispatch();
  const {statuses, priorities} = useSelector((state) => state);

  const [isLongDescriptionShown, setIsLongDescriptionShown] = useState(false);
  const formattedCreationTime = useMemo(() => formatDate(createdAt), [createdAt]);
  const formattedModificationTime = useMemo(() => formatDate(modifiedAt), [modifiedAt]);

  async function updatePriority() {
    const currentIndex = priorities.indexOf(importance);
    const newPriority =
      currentIndex + 1 === priorities.length ? priorities[0] : priorities[currentIndex + 1];
    dispatch(updateTask(_id, {importance: newPriority}));
  }

  async function updateStatus() {
    const currentIndex = statuses.indexOf(status);
    const newStatus =
      currentIndex + 1 === statuses.length ? statuses[0] : statuses[currentIndex + 1];
    dispatch(updateTask(_id, {status: newStatus}));
    /*
    seems like strictMode doesn't like impure functions directly modifying state, so methods like splice or push are discouraged. This is checked by running the setState's callback argument twice. 
    */
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
      <h5>Created by: {user.userName}</h5>
      <div>
        <Button size='small' color={colors[statuses.indexOf(status)]} action={updateStatus}>
          {status}
        </Button>
        <Button size='small' color={colors[priorities.indexOf(importance)]} action={updatePriority}>
          {importance}
        </Button>
      </div>
      <button
        className={styles.description}
        type='button'
        onClick={() => description.length > 100 && setIsLongDescriptionShown((ps) => !ps)}
        style={{cursor: description.length > 100 ? 'pointer' : 'default'}}
      >
        {description.length < 100 || isLongDescriptionShown
          ? description
          : `${description.slice(0, 99)}...`}
      </button>
      <button id='delete' type='button' onClick={() => dispatch(deleteTask(_id))}>
        X
      </button>
    </div>
  );
}

// /task -> everyone's tasks (team leader)
// /task/me -> my tasks (team member)
