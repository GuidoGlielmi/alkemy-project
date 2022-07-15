import TaskForm from 'components/task-form/TaskForm';
import {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux/es/exports';
import {Navigate} from 'react-router-dom';
import {getTasks} from 'redux/actions/tasksActions';
import {loadingContext} from 'components/loading-context/LoadingContext';
// import {toast} from 'react-toastify';
import TaskGroup from 'components/task-group/TaskGroup';
import styles from './Tasks.module.css';

export default function Tasks() {
  const {setIsLoading} = useContext(loadingContext);

  const dispatch = useDispatch();
  const {loggedIn, tasks, statuses, priorities} = useSelector((state) => state);

  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    // avoid using async await with several independent (from eachother) api calls, because there is no need to wait for each of them to complete before calling the next one
    dispatch(getTasks());
    /* 
    toast.error('No se han podido cargar las tareas')); */
  }, [setIsLoading]);

  function groupByStatus(arr) {
    const groupedTasks = arr.reduce(
      (p, c) => ({...p, [c.status]: [...(p[c.status] || []), c]}),
      {},
    ); // if empty, returns the initial value
    return Object.entries(groupedTasks).sort(([[status1]], [[status2]]) => status1 < status2);
  }

  function filterTasks(tasks) {
    let filteredTasks = [...tasks];
    if (selectedPriority !== 'ALL') {
      filteredTasks = filteredTasks.filter((t) => t.importance === selectedPriority);
    }
    if (searchKey) {
      filteredTasks = filteredTasks.filter((t) => t.title.includes(searchKey));
    }
    return filteredTasks;
  }

  if (!loggedIn) return <Navigate to='/login' />;

  return (
    <main className={styles.tasksPage}>
      <h3>Team id: {tasks[0]?.user?.teamId}</h3>
      <TaskForm />
      <section className={styles.tasksContainer}>
        <h2>Mis Tareas</h2>
        <div className={styles.filterContainer}>
          <fieldset className={styles.selectPriority}>
            <legend>Seleccionar por prioridad:</legend>
            <div>
              {['ALL', ...priorities].map((priority) => (
                <div key={priority}>
                  <input
                    onChange={() => setSelectedPriority(priority)}
                    name='priority'
                    type='radio'
                  />
                  <span>{priority}</span>
                </div>
              ))}
            </div>
          </fieldset>
          <div>
            <span>Buscar por título</span>
            <input onChange={({target: {value}}) => debounce(() => setSearchKey(value), 100)()} />
          </div>
        </div>
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
/* 
 rgb(223, 86, 139)
 rgb(134, 246, 239)
background: `linear-gradient(rgb(59, 59, 59), rgb(29, 29, 29)) padding-box, linear-gradient(to right, #${Math.floor(
  Math.random() * 16777215,
  ).toString(16)}, #928dab) border-box`,
*/

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
