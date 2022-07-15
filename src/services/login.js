import api from './apiSingleton';

const loginService = async (values) => (await api.post('/auth/login', values))?.data?.result?.token;

export default loginService;
