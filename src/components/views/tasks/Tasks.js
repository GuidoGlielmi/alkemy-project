import Card from 'components/card/Card';
import TaskForm from 'components/task-form/TaskForm';
import styles from './Tasks.module.css';
import { useState, useEffect, useContext } from 'react';
import { api } from 'components/auth-context/AuthContext';
import { loadingContext } from 'components/loading-context/LoadingContext';
import { toast } from 'react-toastify';
export default function Tasks() {
  const { setIsLoading } = useContext(loadingContext);

  function debounce(func, delay) {
    let timer;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func();
      }, delay);
    };
  }

  useEffect(() => {
    async function getData() {
      // avoid using async await with several independent (from eachother) api calls, because there is no need to wait for each of them to complete before calling the next one
      setIsLoading(true);
      let statuses = {};
      try {
        const {
          data: {
            result: { status, importance },
          },
        } = await api.get('/task/data');
        status.forEach((s) => (statuses[s] = []));
        setStatuses(status.map((s) => ({ title: s })));
        setPriorities(importance.map((i) => ({ title: i })));

        const {
          data: { result },
        } = await api.get('/task/me');
        setTeamId(result[0].user.teamId);
        setTasksByGroup(
          result.reduce((p, _c, i, arr) => {
            p[arr[i].status].push(arr[i]);
            return p;
          }, statuses),
        );
        setIsLoading(false);
      } catch (err) {
        toast.error('No se han podido cargar las tareas');
      }
    }
    getData();
  }, [setIsLoading]);

  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [tasksByGroup, setTasksByGroup] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [teamId, setTeamId] = useState('');
  const [searchKey, setSearchKey] = useState('');

  async function deleteTask({ _id, status }) {
    setIsLoading(true);
    try {
      await api.delete(`/task/${_id}`);
      setTasksByGroup((pt) => {
        return { ...pt, [status]: pt[status].filter((task) => task._id !== _id) };
      });
      toast('Se ha eliminado la tarea satisfactoriamente');
    } catch (err) {
      toast.error('No se ha podido eliminar la tarea');
    }
    setIsLoading(false);
  }

  function addTask(task) {
    setTasksByGroup((pt) => ({ ...pt, [task.status]: [...pt[task.status], task] }));
  }
  function filterTasks(tasks) {
    if (selectedPriority !== 'ALL') {
      tasks = tasks.filter((t) => t.importance === selectedPriority);
    }
    if (searchKey) {
      tasks = tasks.filter((t) => t.title.includes(searchKey));
    }
    return tasks;
  }

  return (
    <main className={styles.tasksPage}>
      <h3>Team id: {teamId}</h3>
      <TaskForm statuses={statuses} priorities={priorities} addTask={addTask} />
      <section className={styles.tasksContainer}>
        <h2>Mis Tareas</h2>
        <div className={styles.filterContainer}>
          <fieldset className={styles.selectPriority}>
            <legend>Seleccionar por prioridad:</legend>
            <div>
              {[{ title: 'ALL' }, ...priorities].map(({ title }) => (
                <div key={title}>
                  <input onChange={() => setSelectedPriority(title)} name='priority' type='radio' />
                  <label>{title}</label>
                </div>
              ))}
            </div>
          </fieldset>
          <div>
            <label>Buscar por título</label>
            <input
              onChange={({ target: { value } }) => debounce(() => setSearchKey(value), 100)()}
            />
          </div>
        </div>
        <div className={styles.tasks}>
          {Object.values(tasksByGroup).every((t) => !t.length) ? (
            <span>No se han creado tareas</span>
          ) : (
            Object.entries(tasksByGroup).map(([status, tasks], i) => {
              const filteredTasks = filterTasks(tasks);
              return (
                !!filteredTasks.length && (
                  <div key={i}>
                    <h3>{status}</h3>
                    <div>
                      {filteredTasks.map((t) => (
                        <Card key={t._id} task={t} deleteTask={deleteTask} />
                      ))}
                    </div>
                  </div>
                )
              );
            })
          )}
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
