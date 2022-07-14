import TaskForm from 'components/task-form/TaskForm';
import {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux/es/exports';
import {getTasks} from 'redux/actions/tasksActions';
import {api} from 'components/auth-context/AuthContext';
import {loadingContext} from 'components/loading-context/LoadingContext';
import {toast} from 'react-toastify';
import TaskGroup from 'components/task-group/TaskGroup';
import styles from './Tasks.module.css';

export default function Tasks() {
  const {setIsLoading} = useContext(loadingContext);

  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    // avoid using async await with several independent (from eachother) api calls, because there is no need to wait for each of them to complete before calling the next one
    setIsLoading(true);

    const p1 = api.get('/task/data');
    p1.then(
      ({
        data: {
          result: {status, importance},
        },
      }) => {
        setStatuses(status.map((s) => ({title: s})));
        setPriorities(importance.map((i) => ({title: i})));
      },
    );

    const p2 = api.get('/task/me');
    p2.then(({data: {result}}) => setTasks(result));

    Promise.all([p1, p2])
      .then(() => setIsLoading(false))
      .catch(() => toast.error('No se han podido cargar las tareas'));
  }, [setIsLoading]);

  function groupByStatus(arr) {
    const groupedTasks = arr.reduce(
      (p, c) => ({...p, [c.status]: [...(p[c.status] || []), c]}),
      {},
    ); // if empty, returns the initial value
    return Object.keys(groupedTasks).sort(([{status1}], [{status2}]) => status1 < status2);
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

  return (
    <main className={styles.tasksPage}>
      <h3>Team id: {tasks[0]?.user?.teamId}</h3>
      <TaskForm statuses={statuses} priorities={priorities} setTasks={setTasks} />
      <section className={styles.tasksContainer}>
        <h2>Mis Tareas</h2>
        <div className={styles.filterContainer}>
          <fieldset className={styles.selectPriority}>
            <legend>Seleccionar por prioridad:</legend>
            <div>
              {[{title: 'ALL'}, ...priorities].map(({title}) => (
                <div key={title}>
                  <input onChange={() => setSelectedPriority(title)} name='priority' type='radio' />
                  <span>{title}</span>
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
          {Object.entries(groupByStatus(filterTasks(tasks))).map(([status, tasks]) => (
            <TaskGroup key={status} tasks={tasks} setTasks={setTasks} />
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
  ).toString(16)}, #928dab) border-box`, */

// eslint-disable-next-line no-unused-vars
function asd() {
  /*
    the value passed to useSelector is an object as the combination of all reducers
    combineReducers({ taskReducer }); -> useSelector(({ tasksReducer }) => tasksReducer)
  
    Remember that tasksReducer returns an object with the entire app state
    function useSelector(reducerCb) {
      const combinedReducersObj = combineReducers({ taskReducer })
      const tasksReducer = reducerCb(combinedReducersObj)
      return tasksReducer(state, { type, payload })
    }
    const globalState = useSelector(({ tasksReducer }) => tasksReducer)
  
    because we combined several reducers, we need to call useSelector with a callback that returns the desired reducer, so redux can know which reducer you want to use.
    */
  // eslint-disable-next-line no-unused-vars
  const {loading, errors, tasks} = useSelector(({tasksReducer}) => tasksReducer);
  const dispatch = useDispatch();
  dispatch(getTasks());
}

function debounce(fn, delay) {
  let timer;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}
