const hasToken = () => !!localStorage.getItem('token');
const setToken = (token: string): void => localStorage.setItem('token', token);
const deleteToken = (): void => localStorage.deleteItem('token');
const getUsername = () => localStorage.getItem('username') || '';
const setUsername = (username: string): void => localStorage.setItem('username', username);
const isTeamLeader = () => !!localStorage.getItem('isTeamLeader');
const setIsTeamLeader = (teamLeaderStatus: boolean): void =>
  localStorage.setItem('isTeamLeader', teamLeaderStatus.toString());
const deleteIsTeamLeader = (): void => localStorage.deleteItem('isTeamLeader');
const getTeamId = () => localStorage.getItem('teamID') || '';
const setTeamId = (teamId: string): void => localStorage.setItem('teamID', teamId);
const clear = (): void => localStorage.clear();

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
