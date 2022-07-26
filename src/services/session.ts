import cacheService from 'services/cache';

export interface Session {
  token?: string;
  isLoggedIn?: boolean;
  userName: string;
  isTeamLeader: boolean;
  teamID: string;
}

export const getSessionService = (): Session => ({
  isLoggedIn: cacheService.hasToken(),
  userName: cacheService.getUsername(),
  isTeamLeader: cacheService.isTeamLeader(),
  teamID: cacheService.getTeamId(),
});
export function saveSessionService(session: Session): void {
  cacheService.setToken(session.token);
  cacheService.setUsername(session.userName);
  if (session.isTeamLeader) cacheService.setIsTeamLeader(session.isTeamLeader);
  cacheService.setTeamId(session.teamID);
}
export const clearSessionService = (): void => cacheService.clear();
export function registerSessionService(username: string): void {
  clearSessionService();
  cacheService.setUsername(username);
}
export const unauthorizeSessionService = (): void => cacheService.deleteToken();
