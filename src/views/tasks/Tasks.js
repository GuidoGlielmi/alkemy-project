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
  const {isLoggedIn, tasks, priorities, teamID} = useSelector((state) => state);

  const isFirstload = useIsFirstLoad(tasks.length);
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    // using void appears to make it not work
    isLoggedIn && dispatch(getAllTasks());
  }, [dispatch, isLoggedIn]);

  function filterTasks() {
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
          {!isFirstload ? (
            <>
              {!tasks.length && <span>No se han creado tareas</span>}
              {groupByStatus(filterTasks()).map(([status, tasks]) =>
                tasks ? <TaskGroup key={status} status={status} tasks={tasks} /> : status,
              )}
            </>
          ) : (
            <Skeletons amount={3} />
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
      <RadioSet
        title='Seleccionar por creador:'
        elements={taskByCreatorArray}
        action={(taskCreator) => dispatch(setTaskCreator(taskCreator))}
        comparator={taskByCreator}
        name='creator'
      />
      <RadioSet
        title='Seleccionar por prioridad:'
        elements={['ALL', ...priorities]}
        action={(priority) => setSelectedPriority(priority)}
        comparator={selectedPriority}
        name='priorities'
      />
      <div>
        <span>Buscar por título</span>
        <input onChange={(e) => debounce(() => setSearchKey(e.target.value), 100)()} />
      </div>
    </div>
  );
}

const RadioSet = ({title, elements, action, comparator, name}) => (
  <fieldset className={styles.selectPriority}>
    <legend>{title}</legend>
    <div>
      {elements.map((e) => (
        <RadioContainer
          key={e}
          tag={e}
          name={name}
          action={() => action(e)}
          checked={comparator === e}
        />
      ))}
    </div>
  </fieldset>
);

const RadioContainer = ({tag, action, name, checked}) => (
  <div>
    <input onChange={action} checked={checked} name={name} type='radio' />
    <span>{tag}</span>
  </div>
);

function useIsFirstLoad(condition = true) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    condition && isFirstLoad && setIsFirstLoad(false);
  }, [condition, isFirstLoad]);

  return isFirstLoad;
}

const Skeletons = ({amount}) => (
  <div className={styles[device ? 'skeletonDevice' : 'skeleton']}>
    {Array(amount)
      .fill(<Skeleton height='50vh' width={device ? '90vw' : '30vw'} />)
      .map((s, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={i}>{s}</Fragment>
      ))}
  </div>
);

function groupByStatus(arr) {
  if (!arr.length) return [[<p style={{margin: '5vh auto 15vh'}}>No se han encontrado tareas</p>]];
  const groupedTasks = arr.reduce((p, c) => ({...p, [c.status]: [...(p[c.status] || []), c]}), {});
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
