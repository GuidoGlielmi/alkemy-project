import {useState, useEffect, Fragment} from 'react';
import Skeleton from 'react-loading-skeleton';
import TaskGroup from 'components/task-group/TaskGroup';
import {useSelector} from 'react-redux';
import styles from './Tasks.module.css';

const device = window.innerWidth < 768;

export default function Tasks({selectedPriority, searchKey}) {
  const {tasks} = useSelector((state) => state);
  const isFirstload = useIsFirstLoad(tasks.length);

  function filterTasks() {
    let filteredTasks = [...tasks];
    if (selectedPriority !== 'ALL') {
      filteredTasks = filteredTasks.filter((t) => t.importance === selectedPriority);
    }
    if (searchKey) filteredTasks = filteredTasks.filter((t) => t.title.includes(searchKey));
    return filteredTasks;
  }

  return (
    <div className={styles.tasks}>
      {when(isFirstload)
        .render(<Skeletons amount={3} />)
        .elseWhen(!tasks.length)
        .render(<span>No se han creado tareas</span>)
        .else(
          groupByStatus(filterTasks()).map(([status, tasks]) =>
            tasks ? <TaskGroup key={status} status={status} tasks={tasks} /> : status,
          ),
        )}
    </div>
  );
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

function useIsFirstLoad(condition = true) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    condition && isFirstLoad && setIsFirstLoad(false);
  }, [condition, isFirstLoad]);

  return isFirstLoad;
}

function groupByStatus(arr) {
  if (!arr.length) return [[<p style={{margin: '5vh auto 15vh'}}>No se han encontrado tareas</p>]];
  const groupedTasks = arr.reduce((p, c) => ({...p, [c.status]: [...(p[c.status] || []), c]}), {});
  return Object.entries(groupedTasks).sort(([[status1]], [[status2]]) => status1 < status2);
}

const when = (condition, value) => ({
  elseWhen: (newCondition) => when(condition || newCondition, value),
  render: (v) => when(condition, condition && (value || v)),
  else: (v) => value || v,
  get: value || null,
});
