import api from './Api';

const loginService = async (values) => {
  const res = await api.post('/auth/login', values);
  return {
    token: res?.token,
    username: res?.user?.userName,
    isTeamLeader: res?.user?.role === 'Team Leader',
    teamID: res?.user?.teamID,
  };
};

export default loginService;
