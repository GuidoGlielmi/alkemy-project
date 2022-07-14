import api from './apiSingleton';

const login = async (values) => (await api.post('/auth/login', values))?.data?.result?.token;

export default login;
