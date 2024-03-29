import {useState, useEffect, Fragment, useMemo} from 'react';
import Skeleton from 'react-loading-skeleton';
import TaskGroup from 'components/task-group/TaskGroup';
import {useSelector} from 'react-redux';
import styles from './Tasks.module.css';

const device = window.innerWidth < 768;

export default function Tasks({selectedPriority, searchKey}) {
  const {tasks} = useSelector(state => state);
  const isFirstload = useIsFirstLoad(tasks.length);

  const filteredTasks = useMemo(() => {
    let ft = [...tasks];
    if (selectedPriority !== 'ALL') {
      ft = ft.filter(t => t.importance === selectedPriority);
    }
    if (searchKey) ft = ft.filter(t => t.title.toLowerCase().includes(searchKey.toLowerCase()));
    return ft.length ? groupByStatus(ft) : [];
  }, [tasks, selectedPriority, searchKey]);

  return (
    <div className={styles.tasks}>
      {when(isFirstload)
        .return(<Skeletons amount={3} />)
        .elseWhen(!tasks.length)
        .return(<span>No se han creado tareas</span>)
        .elseWhen(!!filteredTasks.length)
        .return(
          filteredTasks.map(([status, ts]) => (
            <TaskGroup key={status} status={status} tasks={ts} />
          )),
        )
        .else(<p style={{margin: '5vh auto 15vh'}}>No se han encontrado tareas</p>)}
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
  const groupedTasks = arr.reduce((p, c) => ({...p, [c.status]: [...(p[c.status] || []), c]}), {});
  return Object.entries(groupedTasks).sort(([[status1]], [[status2]]) => status1 < status2);
}

export const when = (condition, value) => ({
  elseWhen: newCondition => when(condition || newCondition, value),
  return: v => when(condition, condition === true ? value ?? v : null),
  else: v => value ?? v,
  get: value,
});
