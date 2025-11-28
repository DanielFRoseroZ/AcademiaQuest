/**
 * Servicio de almacenamiento local (localStorage)
 * Simula una API persistente
 */

const STORAGE_KEYS = {
  USERS: 'academiaquest_users',
  TEAMS: 'academiaquest_teams',
  MISSIONS: 'academiaquest_missions',
  CHALLENGES: 'academiaquest_challenges',
  XP_EVENTS: 'academiaquest_xp_events',
  NOTIFICATIONS: 'academiaquest_notifications',
  WEEKLY_GOAL: 'academiaquest_weekly_goal',
  CURRENT_USER: 'academiaquest_current_user',
};

export const storage = {
  // Usuarios
  getUsers: (): any[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },
  saveUsers: (users: any[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },
  
  // Equipos
  getTeams: (): any[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TEAMS);
    return data ? JSON.parse(data) : [];
  },
  saveTeams: (teams: any[]) => {
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
  },
  
  // Misiones
  getMissions: (): any[] => {
    const data = localStorage.getItem(STORAGE_KEYS.MISSIONS);
    return data ? JSON.parse(data) : [];
  },
  saveMissions: (missions: any[]) => {
    localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
  },
  
  // Desafíos
  getChallenges: (): any[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
    return data ? JSON.parse(data) : [];
  },
  saveChallenges: (challenges: any[]) => {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
  },
  
  // Eventos XP
  getXPEvents: (): any[] => {
    const data = localStorage.getItem(STORAGE_KEYS.XP_EVENTS);
    return data ? JSON.parse(data) : [];
  },
  saveXPEvents: (events: any[]) => {
    localStorage.setItem(STORAGE_KEYS.XP_EVENTS, JSON.stringify(events));
  },
  
  // Notificaciones
  getNotifications: (): any[] => {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : [];
  },
  saveNotifications: (notifications: any[]) => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  },
  
  // Meta semanal
  getWeeklyGoal: (): any | null => {
    const data = localStorage.getItem(STORAGE_KEYS.WEEKLY_GOAL);
    return data ? JSON.parse(data) : null;
  },
  saveWeeklyGoal: (goal: any) => {
    localStorage.setItem(STORAGE_KEYS.WEEKLY_GOAL, JSON.stringify(goal));
  },
  
  // Usuario actual
  getCurrentUser: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  },
  setCurrentUser: (userId: string) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId);
  },
  clearCurrentUser: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
  
  // Inicializar datos seed
  initialize: () => {
    // Solo inicializar si no hay datos
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      // Los datos se inicializarán desde el contexto
      return true;
    }
    return false;
  },
  
  // Limpiar todo (útil para desarrollo)
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};

