import api from './apiSingleton';

export const formDataService = async () => (await api.get('/auth/data'))?.data?.result;
export const registerService = async (user) => api.post('/auth/register', {user});
