import api from './apiSingleton';

export const formDataService = async () => (await api.get('/auth/data'))?.data?.result;
export const registerService = async () => api.post('/auth/register');
