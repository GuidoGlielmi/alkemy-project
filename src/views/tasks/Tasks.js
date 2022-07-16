import TaskForm from 'components/task-form/TaskForm';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux/es/exports';
import {Navigate} from 'react-router-dom';
import {getMyTasks, getAllTasks} from 'redux/actions/tasksActions';
import TaskGroup from 'components/task-group/TaskGroup';
import styles from './Tasks.module.css';

export default function Tasks() {
  const dispatch = useDispatch();
  const {loggedIn, tasks, priorities, isTeamLeader, teamID} = useSelector((state) => state);

  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [searchKey, setSearchKey] = useState('');

  useEffect(
    () => void dispatch(isTeamLeader ? getAllTasks() : getMyTasks()),
    [dispatch, isTeamLeader],
  );

  function filterTasks(tasks) {
    let filteredTasks = [...tasks];
    if (selectedPriority !== 'ALL') {
      filteredTasks = filteredTasks.filter((t) => t.importance === selectedPriority);
    }
    if (searchKey) filteredTasks = filteredTasks.filter((t) => t.title.includes(searchKey));
    return filteredTasks;
  }

  if (!loggedIn) return <Navigate to='/login' />;

  return (
    <main className={styles.tasksPage}>
      <h3>Team id: {teamID}</h3>
      <TaskForm />
      <section className={styles.tasksContainer}>
        <h2>Mis Tareas</h2>
        <FilterBox
          priorities={priorities}
          setSelectedPriority={setSelectedPriority}
          setSearchKey={setSearchKey}
        />
        <div className={styles.tasks}>
          {!tasks.length && <span>No se han creado tareas</span>}
          {groupByStatus(filterTasks(tasks)).map(([status, tasks]) => (
            <TaskGroup key={status} status={status} tasks={tasks} />
          ))}
        </div>
      </section>
    </main>
  );
}

function FilterBox({priorities, setSelectedPriority, setSearchKey}) {
  return (
    <div className={styles.filterContainer}>
      <fieldset className={styles.selectPriority}>
        <legend>Seleccionar por prioridad:</legend>
        <div>
          {['ALL', ...priorities].map((priority) => (
            <Priority
              key={priority}
              priority={priority}
              setSelectedPriority={setSelectedPriority}
            />
          ))}
        </div>
      </fieldset>
      <div>
        <span>Buscar por título</span>
        <input onChange={({target: {value}}) => debounce(() => setSearchKey(value), 100)()} />
      </div>
    </div>
  );
}

function Priority({priority, setSelectedPriority}) {
  return (
    <div>
      <input onChange={() => setSelectedPriority(priority)} name='priority' type='radio' />
      <span>{priority}</span>
    </div>
  );
}

function groupByStatus(arr) {
  const groupedTasks = arr.reduce((p, c) => ({...p, [c.status]: [...(p[c.status] || []), c]}), {}); // if empty, returns the initial value
  return Object.entries(groupedTasks).sort(([[status1]], [[status2]]) => status1 < status2);
}

function debounce(fn, delay) {
  let timer;
  let active = false;
  return () => {
    if (active) clearTimeout(timer);
    timer = setTimeout(() => {
      active = false;
      fn();
    }, delay);
    active = true;
  };
}
