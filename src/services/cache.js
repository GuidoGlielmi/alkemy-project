const hasToken = () => !!localStorage.getItem('token');
const setToken = token => localStorage.setItem('token', token);
const deleteToken = () => localStorage.removeItem('token');
const getUsername = () => localStorage.getItem('username') || '';
const setUsername = username => localStorage.setItem('username', username);
const isTeamLeader = () => !!localStorage.getItem('isTeamLeader');
const setIsTeamLeader = isTeamLeader => localStorage.setItem('isTeamLeader', isTeamLeader);
const deleteIsTeamLeader = () => localStorage.removeItem('isTeamLeader');
const getTeamId = () => localStorage.getItem('teamID') || '';
const setTeamId = teamId => localStorage.setItem('teamID', teamId);
const clear = () => localStorage.clear();

export default {
  hasToken,
  setToken,
  deleteToken,
  setUsername,
  getUsername,
  isTeamLeader,
  setIsTeamLeader,
  deleteIsTeamLeader,
  setTeamId,
  getTeamId,
  clear,
};
