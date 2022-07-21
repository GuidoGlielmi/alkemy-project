import cacheService from 'services/cache';

export const getSessionService = () => ({
  isLoggedIn: cacheService.hasToken(),
  username: cacheService.getUsername(),
  isTeamLeader: cacheService.isTeamLeader(),
  teamID: cacheService.getTeamId(),
});
export function saveSessionService(session) {
  cacheService.setToken(session.token);
  cacheService.setUsername(session.username);
  session.isTeamLeader && cacheService.setIsTeamLeader(session.isTeamLeader);
  cacheService.setTeamId(session.teamID);
}
export const clearSessionService = () => cacheService.clear();
export function registerSessionService(username) {
  clearSessionService();
  cacheService.setUsername(username);
}
export const unauthorizeSessionService = () => cacheService.deleteToken();
