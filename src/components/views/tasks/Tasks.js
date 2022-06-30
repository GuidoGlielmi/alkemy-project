import Card from 'components/card/Card';
import TaskForm from 'components/task-form/TaskForm';
import styles from './Tasks.module.css';
import { useState, useEffect, useContext } from 'react';
import { api } from 'components/auth-context/AuthContext';
import { loadingContext } from 'components/loading-context/LoadingContext';
import { toast } from 'react-toastify';
export default function Tasks() {
  const { setIsLoading } = useContext(loadingContext);

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
  const [teamId, setTeamId] = useState('');

  async function deleteTask(taskId) {
    try {
      await api.delete(`/task/${taskId}`);
      setTasksByGroup((pt) => {
        for (let [key, group] of Object.entries(pt)) {
          for (let i = 0; i < group.length; i++) {
            if (group[i]._id === taskId) {
              return { ...pt, [key]: group.filter((_, idx) => idx !== i) };
            }
          }
        }
        return pt;
      });
      toast('Se ha eliminado la tarea satisfactoriamente');
    } catch (err) {
      toast.error('No se ha podido eliminar la tarea');
    }
  }

  function addTask(task) {
    setTasksByGroup((pt) => ({ ...pt, [task.status]: [...pt[task.status], task] }));
  }

  console.log(tasksByGroup);
  return (
    <main className={styles.tasksPage}>
      <h3>Team id: {teamId}</h3>
      <TaskForm
        statuses={statuses}
        priorities={priorities}
        setTasks={setTasksByGroup}
        addTask={addTask}
      />
      <section className={styles.tasksContainer}>
        <h2>Mis Tareas</h2>
        <div className={styles.tasks}>
          {Object.values(tasksByGroup).every((t) => !t.length) ? (
            <span>No se han creado tareas</span>
          ) : (
            Object.entries(tasksByGroup).map(([status, tasks], i) => {
              return tasks.length ? (
                <div key={i}>
                  <h3>{status}</h3>
                  <div>
                    {tasks.map((t) => (
                      <Card key={t._id} task={t} deleteTask={deleteTask} />
                    ))}
                  </div>
                  <hr />
                </div>
              ) : (
                <span key={i}>No se han creado tareas</span>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
