import {useState, useEffect} from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import TaskForm from 'components/task-form/TaskForm';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {getAllTasks, setTaskCreator} from 'redux/tasksSlice';
import TasksComponent from 'components/tasks/Tasks';
import styles from './Tasks.module.css';

const taskByCreatorArray = ['ALL', 'MINE'];
const RadioContainer = ({tag, action, name, checked}) => (
  <div>
    <input onChange={action} checked={checked} name={name} type='radio' />
    <span>{tag}</span>
  </div>
);
const RadioSet = ({title, elements, action, comparator, name}) => (
  <fieldset className={styles.selectPriority}>
    <legend>{title}</legend>
    <div>
      {elements.map((e: string) => (
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
function debounce(fn: () => any, delay: number) {
  let timer: NodeJS.Timeout;
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
function FilterBox({selectedPriority, setSelectedPriority, setSearchKey}) {
  const dispatch = useAppDispatch();
  const {taskByCreator, importance: priorities} = useAppSelector(state => state);
  return (
    <div className={styles.filterContainer}>
      <RadioSet
        title='Seleccionar por creador:'
        elements={taskByCreatorArray}
        action={(taskCreator: string) => dispatch(setTaskCreator(taskCreator))}
        comparator={taskByCreator}
        name='creator'
      />
      <RadioSet
        title='Seleccionar por prioridad:'
        elements={['ALL', ...priorities]}
        action={(priority: string) => setSelectedPriority(priority)}
        comparator={selectedPriority}
        name='priorities'
      />
      <div>
        <span>Buscar por título</span>
        <input onChange={e => debounce(() => setSearchKey(e.target.value), 100)()} />
      </div>
    </div>
  );
}

export default function Tasks() {
  const dispatch = useAppDispatch();
  const {isLoggedIn, teamID} = useAppSelector(state => state);

  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    // using void appears to make it not work
    if (isLoggedIn) dispatch(getAllTasks(''));
  }, [dispatch, isLoggedIn]);

  return (
    <main className={styles.tasksPage}>
      <h3>Team id: {teamID}</h3>
      <TaskForm />
      <section className={styles.tasksContainer}>
        <h2>Mis Tareas</h2>
        <FilterBox
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          setSearchKey={setSearchKey}
        />
        <TasksComponent searchKey={searchKey} selectedPriority={selectedPriority} />
      </section>
    </main>
  );
}
