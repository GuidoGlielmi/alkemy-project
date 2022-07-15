import api from './apiSingleton';

export const taskDataService = async () => {
  const res = (await api.get('/task/data'))?.data?.result;
  return {status: res?.status, importance: res?.importance};
};
export const getTasksService = async () => (await api.get('/task/me'))?.data?.result;

export const addTaskService = async (task) => api.post('/task', {task});

export const deleteTaskService = async (id) => api.delete(`/task/${id}`);

export const updateTaskService = async (id, task) => api.patch(`/task/${id}`, {task});
