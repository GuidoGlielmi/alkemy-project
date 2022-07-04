import Card from 'components/card/Card';
import TaskForm from 'components/task-form/TaskForm';
import { useState, useEffect, useContext } from 'react';
import { api } from 'components/auth-context/AuthContext';
import { loadingContext } from 'components/loading-context/LoadingContext';
import { toast } from 'react-toastify';
import styles from './Tasks.module.css';

function debounce(func, delay) {
  let timer;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
}

export default function Tasks() {
  const { setIsLoading } = useContext(loadingContext);

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
          result: { status, importance },
        },
      }) => {
        setStatuses(status.map((s) => ({ title: s })));
        setPriorities(importance.map((i) => ({ title: i })));
      },
    );

    const p2 = api.get('/task/me');
    p2.then(({ data: { result } }) => setTasks(result));

    Promise.all([p1, p2])
      .then(() => setIsLoading(false))
      .catch(() => toast.error('No se han podido cargar las tareas'));
  }, [setIsLoading]);

  function groupByStatus(arr) {
    const groupedTasks = arr.reduce(
      (p, _, i) => ({ ...p, [arr[i].status]: [...(p[arr[i].status] || []), arr[i]] }),
      {},
    ); // if empty, returns the initial value
    return Object.keys(groupedTasks)
      .sort((a, b) => a < b)
      .reduce((p, _, i, array) => ({ ...p, [array[i]]: groupedTasks[array[i]] }), {});
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
              {[{ title: 'ALL' }, ...priorities].map(({ title }) => (
                <div key={title}>
                  <input onChange={() => setSelectedPriority(title)} name='priority' type='radio' />
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </fieldset>
          <div>
            <span>Buscar por título</span>
            <input
              onChange={({ target: { value } }) => debounce(() => setSearchKey(value), 100)()}
            />
          </div>
        </div>
        <div className={styles.tasks}>
          {!tasks.length && <span>No se han creado tareas</span>}
          {Object.entries(groupByStatus(filterTasks(tasks))).map(([status, tasks]) => (
            <div key={status}>
              <h3>{status}</h3>
              <div>
                {tasks.map((t) => (
                  <Card
                    key={t._id}
                    task={t}
                    setTasks={setTasks}
                    priorities={priorities}
                    statuses={statuses}
                  />
                ))}
              </div>
            </div>
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
