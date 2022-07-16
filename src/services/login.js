import api from './apiSingleton';

const loginService = async (values) => {
  const res = (await api.post('/auth/login', values))?.data?.result;
  return {
    token: res?.token,
    username: res?.user.userName,
    isTeamLeader: res?.user.role === 'Team Leader',
  };
};

export default loginService;
