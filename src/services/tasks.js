import api from './Api';

export const taskDataService = async () => {
  const res = await api.get('/task/data');
  return {status: res?.status, importance: res?.importance};
};

export const getMyTasksService = async () => api.get('/task/me');

export const getAllTasksService = async () => api.get('/task');

export const addTaskService = async (task) => (await api.post('/task', {task}))?.task;

export const deleteTaskService = async (id) => api.delete(`/task/${id}`);

export const updateTaskService = async (id, task) => api.patch(`/task/${id}`, {task});
