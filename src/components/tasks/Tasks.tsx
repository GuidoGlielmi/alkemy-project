import {useState, useEffect, Fragment} from 'react';
import Skeleton from 'react-loading-skeleton';
import TaskGroup from 'components/task-group/TaskGroup';
import {useAppSelector} from 'redux/hooks';
import {ITask} from 'services/goScrum';
import styles from './Tasks.module.css';

const device = window.innerWidth < 768;

export const when = (condition: boolean, value?: any) => ({
  elseWhen: (newCondition: boolean) => when(condition || newCondition, value),
  return: (v: any) => when(condition, condition === true ? value ?? v : null),
  else: (v: any) => value ?? v,
  get: value,
});

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
    if (condition && isFirstLoad) setIsFirstLoad(false);
  }, [condition, isFirstLoad]);

  return isFirstLoad;
}

function groupByStatus(arr: ITask[]) {
  if (!arr.length) return [[<p style={{margin: '5vh auto 15vh'}}>No se han encontrado tareas</p>]];
  const groupedTasks = arr.reduce((p, c) => ({...p, [c.status]: [...(p[c.status] || []), c]}), {});
  return Object.entries(groupedTasks).sort(([[status1]], [[status2]]) =>
    status1 < status2 ? 1 : -1,
  );
}

export default function Tasks({selectedPriority, searchKey}) {
  const {tasks} = useAppSelector(state => state);
  const isFirstload = useIsFirstLoad(!!tasks.length);

  function filterTasks() {
    let filteredTasks = [...tasks];
    if (selectedPriority !== 'ALL') {
      filteredTasks = filteredTasks.filter(t => t.importance === selectedPriority);
    }
    if (searchKey) filteredTasks = filteredTasks.filter(t => t.title.includes(searchKey));
    return filteredTasks;
  }

  return (
    <div className={styles.tasks}>
      {when(isFirstload)
        .return(<Skeletons amount={3} />)
        .elseWhen(!tasks.length)
        .return(<span>No se han creado tareas</span>)
        .else(
          groupByStatus(filterTasks()).map(([status, ts]) =>
            ts ? <TaskGroup key={status} status={status} tasks={ts} /> : status,
          ),
        )}
    </div>
  );
}
