import api from './Api';

export const formDataService = async () => api.get('/auth/data');
export const registerService = async (user) => api.post('/auth/register', {user});
