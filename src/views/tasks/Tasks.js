import {useState, useEffect, Fragment} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TaskForm from 'components/task-form/TaskForm';
import {useSelector, useDispatch} from 'react-redux/es/exports';
import {getAllTasks, setTaskCreator} from 'redux/actions/tasksActions';
import TaskGroup from 'components/task-group/TaskGroup';
import styles from './Tasks.module.css';

const taskByCreatorArray = ['ALL', 'MINE'];
const device = window.innerWidth < 768;

export default function Tasks() {
  const dispatch = useDispatch();
  const {isLoggedIn, tasks, priorities, isTeamLeader, teamID, isLoading} = useSelector(
    (state) => state,
  );

  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    // using void appears to make it not work
    isLoggedIn && dispatch(getAllTasks());
  }, [dispatch, isTeamLeader, isLoggedIn]);

  function filterTasks(tasks) {
    let filteredTasks = [...tasks];
    if (selectedPriority !== 'ALL') {
      filteredTasks = filteredTasks.filter((t) => t.importance === selectedPriority);
    }
    if (searchKey) filteredTasks = filteredTasks.filter((t) => t.title.includes(searchKey));
    return filteredTasks;
  }

  return (
    <main className={styles.tasksPage}>
      <h3>Team id: {teamID}</h3>
      <TaskForm />
      <section className={styles.tasksContainer}>
        <h2>Mis Tareas</h2>
        <FilterBox
          priorities={priorities}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          setSearchKey={setSearchKey}
        />
        <div className={styles.tasks}>
          {!isLoading ? (
            <>
              {!tasks.length && <span>No se han creado tareas</span>}
              {groupByStatus(filterTasks(tasks)).map(([status, tasks]) => (
                <TaskGroup key={status} status={status} tasks={tasks} />
              ))}
            </>
          ) : (
            <div className={styles[device ? 'skeletonDevice' : 'skeleton']}>
              {createSkeletons(3)}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function FilterBox({priorities, selectedPriority, setSelectedPriority, setSearchKey}) {
  const dispatch = useDispatch();
  const {taskByCreator} = useSelector((state) => state);
  return (
    <div className={styles.filterContainer}>
      <fieldset className={styles.selectPriority}>
        <legend>Seleccionar por creador:</legend>
        <div>
          {taskByCreatorArray.map((tc) => (
            <RadioContainer
              key={tc}
              tag={tc}
              name='creator'
              action={() => dispatch(setTaskCreator(tc))}
              checked={taskByCreator === tc}
            />
          ))}
        </div>
      </fieldset>
      <fieldset className={styles.selectPriority}>
        <legend>Seleccionar por prioridad:</legend>
        <div>
          {['ALL', ...priorities].map((p) => (
            <RadioContainer
              key={p}
              tag={p}
              name='priority'
              action={() => setSelectedPriority(p)}
              checked={selectedPriority === p}
            />
          ))}
        </div>
      </fieldset>
      <div>
        <span>Buscar por título</span>
        <input onChange={(e) => debounce(() => setSearchKey(e.target.value), 100)()} />
      </div>
    </div>
  );
}

function RadioContainer({tag, action, name, checked}) {
  return (
    <div>
      <input onChange={action} checked={checked} name={name} type='radio' />
      <span>{tag}</span>
    </div>
  );
}

const createSkeletons = (n) =>
  Array(n)
    .fill(<Skeleton height='50vh' width={device ? '90vw' : '30vw'} />)
    // eslint-disable-next-line react/no-array-index-key
    .map((s, i) => <Fragment key={i}>{s}</Fragment>);

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
