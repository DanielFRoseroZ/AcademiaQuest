import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, Team, Mission, Challenge, XPEvent, Notification, WeeklyGoal } from '../types';
import { seedUsers, seedTeams, seedMissions, seedChallenges, getWeeklyGoal } from '../data/seed';
import { storage } from '../services/storage';
import { GAMIFICATION_CONFIG } from '../config/gamification';

interface AppState {
  users: User[];
  teams: Team[];
  missions: Mission[];
  challenges: Challenge[];
  xpEvents: XPEvent[];
  notifications: Notification[];
  weeklyGoal: WeeklyGoal | null;
  currentUserId: string | null;
}

type AppAction =
  | { type: 'INIT_DATA'; payload: Partial<AppState> }
  | { type: 'SET_CURRENT_USER'; payload: string | null }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'UPDATE_MISSION'; payload: Mission }
  | { type: 'ADD_MISSION'; payload: Mission }
  | { type: 'UPDATE_CHALLENGE'; payload: Challenge }
  | { type: 'ADD_XP_EVENT'; payload: XPEvent }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'UPDATE_WEEKLY_GOAL'; payload: WeeklyGoal }
  | { type: 'UPDATE_TEAM'; payload: Team };

const initialState: AppState = {
  users: [],
  teams: [],
  missions: [],
  challenges: [],
  xpEvents: [],
  notifications: [],
  weeklyGoal: null,
  currentUserId: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'INIT_DATA':
      return { ...state, ...action.payload };
    
    case 'SET_CURRENT_USER':
      return { ...state, currentUserId: action.payload };
    
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(u => u.id === action.payload.id ? action.payload : u),
      };
    
    case 'UPDATE_MISSION':
      return {
        ...state,
        missions: state.missions.map(m => m.id === action.payload.id ? action.payload : m),
      };
    
    case 'ADD_MISSION':
      return {
        ...state,
        missions: [...state.missions, action.payload],
      };
    
    case 'UPDATE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(c => c.id === action.payload.id ? action.payload : c),
      };
    
    case 'ADD_XP_EVENT':
      return {
        ...state,
        xpEvents: [...state.xpEvents, action.payload],
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    
    case 'UPDATE_WEEKLY_GOAL':
      return {
        ...state,
        weeklyGoal: action.payload,
      };
    
    case 'UPDATE_TEAM':
      return {
        ...state,
        teams: state.teams.map(t => t.id === action.payload.id ? action.payload : t),
      };
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  currentUser: User | null;
  // Helper functions
  addXP: (userId: string, amount: number, type: XPEvent['type'], sourceId?: string, description?: string) => void;
  completeMission: (missionId: string) => void;
  acceptChallenge: (challengeId: string) => void;
  startMission: (missionId: string) => void;
  updateMissionProgress: (missionId: string, progress: number) => void;
  contributeToTeamMission: (missionId: string, progress: number) => void;
  checkBadges: (userId: string) => void;
  updateStreak: (userId: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Inicializar datos
  useEffect(() => {
    const needsInit = storage.initialize();
    
    if (needsInit) {
      // Cargar seed data
      const users = seedUsers;
      const teams = seedTeams;
      const missions = seedMissions;
      const challenges = seedChallenges;
      const weeklyGoal = getWeeklyGoal();
      
      // Guardar en localStorage
      storage.saveUsers(users);
      storage.saveTeams(teams);
      storage.saveMissions(missions);
      storage.saveChallenges(challenges);
      storage.saveWeeklyGoal(weeklyGoal);
      
      dispatch({
        type: 'INIT_DATA',
        payload: { users, teams, missions, challenges, weeklyGoal },
      });
    } else {
      // Cargar desde localStorage
      const users = storage.getUsers();
      const teams = storage.getTeams();
      const missions = storage.getMissions();
      const challenges = storage.getChallenges();
      const weeklyGoal = storage.getWeeklyGoal() || getWeeklyGoal();
      const currentUserId = storage.getCurrentUser();
      
      dispatch({
        type: 'INIT_DATA',
        payload: { users, teams, missions, challenges, weeklyGoal, currentUserId },
      });
    }
  }, []);

  // Persistir cambios en localStorage
  useEffect(() => {
    if (state.users.length > 0) {
      storage.saveUsers(state.users);
    }
  }, [state.users]);

  useEffect(() => {
    if (state.teams.length > 0) {
      storage.saveTeams(state.teams);
    }
  }, [state.teams]);

  useEffect(() => {
    if (state.missions.length > 0) {
      storage.saveMissions(state.missions);
    }
  }, [state.missions]);

  useEffect(() => {
    if (state.challenges.length > 0) {
      storage.saveChallenges(state.challenges);
    }
  }, [state.challenges]);

  useEffect(() => {
    if (state.xpEvents.length > 0) {
      storage.saveXPEvents(state.xpEvents);
    }
  }, [state.xpEvents]);

  useEffect(() => {
    if (state.notifications.length > 0) {
      storage.saveNotifications(state.notifications);
    }
  }, [state.notifications]);

  useEffect(() => {
    if (state.weeklyGoal) {
      storage.saveWeeklyGoal(state.weeklyGoal);
    }
  }, [state.weeklyGoal]);

  useEffect(() => {
    if (state.currentUserId) {
      storage.setCurrentUser(state.currentUserId);
    }
  }, [state.currentUserId]);

  const currentUser = state.currentUserId
    ? state.users.find(u => u.id === state.currentUserId) || null
    : null;

  // Helper: Agregar XP
  const addXP = (
    userId: string,
    amount: number,
    type: XPEvent['type'],
    sourceId?: string,
    description?: string
  ) => {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;

    // Aplicar bonus de racha
    const finalAmount = GAMIFICATION_CONFIG.streak.applyStreakBonus(amount, user.streak);

    // Crear evento XP
    const xpEvent: XPEvent = {
      id: `xp_${Date.now()}_${Math.random()}`,
      type,
      userId,
      amount: finalAmount,
      timestamp: new Date().toISOString(),
      sourceId,
      description,
    };

    // Actualizar usuario
    const newXP = user.xp + finalAmount;
    const newLevel = GAMIFICATION_CONFIG.levelCalculation.calculateLevel(newXP);
    const oldLevel = user.level;

    const updatedUser: User = {
      ...user,
      xp: newXP,
      level: newLevel,
    };

    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    dispatch({ type: 'ADD_XP_EVENT', payload: xpEvent });

    // Notificación de XP ganado
    const notification: Notification = {
      id: `notif_${Date.now()}_${Math.random()}`,
      type: 'xp',
      title: `+${finalAmount} XP Ganados`,
      message: description || `Has ganado ${finalAmount} XP`,
      timestamp: new Date().toISOString(),
      read: false,
      userId,
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });

    // Si subió de nivel
    if (newLevel > oldLevel) {
      const levelNotification: Notification = {
        id: `notif_level_${Date.now()}_${Math.random()}`,
        type: 'level',
        title: '¡Nivel Subido!',
        message: `Alcanzaste el Nivel ${newLevel}`,
        timestamp: new Date().toISOString(),
        read: false,
        userId,
      };
      dispatch({ type: 'ADD_NOTIFICATION', payload: levelNotification });
    }

    // Verificar badges
    checkBadges(userId);
  };

  // Helper: Completar misión
  const completeMission = (missionId: string) => {
    const mission = state.missions.find(m => m.id === missionId);
    if (!mission || !currentUser) return;

    if (mission.type === 'team' && mission.teamId) {
      // Misión grupal: todos los miembros ganan XP
      const team = state.teams.find(t => t.id === mission.teamId);
      if (team) {
        team.memberIds.forEach(memberId => {
          addXP(
            memberId,
            mission.rewardXp,
            'team_mission_complete',
            missionId,
            `Misión grupal completada: ${mission.title}`
          );
        });
      }
    } else {
      // Misión individual
      addXP(
        currentUser.id,
        mission.rewardXp,
        'mission_complete',
        missionId,
        `Misión completada: ${mission.title}`
      );
    }

    // Actualizar misión
    const updatedMission: Mission = {
      ...mission,
      status: 'completed',
      progress: 100,
    };
    dispatch({ type: 'UPDATE_MISSION', payload: updatedMission });

    // Actualizar meta semanal
    if (state.weeklyGoal) {
      const updatedGoal: WeeklyGoal = {
        ...state.weeklyGoal,
        current: state.weeklyGoal.current + 1,
      };
      dispatch({ type: 'UPDATE_WEEKLY_GOAL', payload: updatedGoal });

      // Si alcanzó la meta semanal
      if (updatedGoal.current >= updatedGoal.target && updatedGoal.current === state.weeklyGoal.current + 1) {
        addXP(
          currentUser.id,
          updatedGoal.xpBonus,
          'weekly_goal',
          undefined,
          'Meta semanal alcanzada'
        );
      }
    }

    // Actualizar racha
    updateStreak(currentUser.id);
  };

  // Helper: Aceptar desafío
  const acceptChallenge = (challengeId: string) => {
    const challenge = state.challenges.find(c => c.id === challengeId);
    if (!challenge || !currentUser) return;

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + challenge.durationHours * 60 * 60 * 1000);

    const updatedChallenge: Challenge = {
      ...challenge,
      status: 'in_progress',
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      participants: [...challenge.participants, currentUser.id],
    };

    dispatch({ type: 'UPDATE_CHALLENGE', payload: updatedChallenge });

    const notification: Notification = {
      id: `notif_${Date.now()}_${Math.random()}`,
      type: 'challenge',
      title: 'Desafío Aceptado',
      message: `Has aceptado el desafío: ${challenge.title}`,
      timestamp: new Date().toISOString(),
      read: false,
      userId: currentUser.id,
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  // Helper: Iniciar misión
  const startMission = (missionId: string) => {
    if (!currentUser) return;

    const mission = state.missions.find(m => m.id === missionId);
    if (!mission) return;

    const updatedMission: Mission = {
      ...mission,
      status: 'in_progress',
      assignedTo: currentUser.id,
      progress: mission.progress || 0,
    };

    dispatch({ type: 'UPDATE_MISSION', payload: updatedMission });
  };

  // Helper: Actualizar progreso de misión
  const updateMissionProgress = (missionId: string, progress: number) => {
    const mission = state.missions.find(m => m.id === missionId);
    if (!mission) return;

    const updatedMission: Mission = {
      ...mission,
      progress: Math.min(100, Math.max(0, progress)),
    };

    dispatch({ type: 'UPDATE_MISSION', payload: updatedMission });
  };

  // Helper: Contribuir a misión grupal
  const contributeToTeamMission = (missionId: string, progress: number) => {
    if (!currentUser) return;

    const mission = state.missions.find(m => m.id === missionId);
    if (!mission || mission.type !== 'team' || !mission.teamId) return;

    const contributions = mission.contributions || [];
    const existingContribution = contributions.find(c => c.userId === currentUser.id);
    
    let updatedContributions;
    if (existingContribution) {
      updatedContributions = contributions.map(c =>
        c.userId === currentUser.id
          ? { ...c, progress: Math.min(100, c.progress + progress) }
          : c
      );
    } else {
      updatedContributions = [...contributions, { userId: currentUser.id, progress }];
    }

    // Calcular progreso total
    const totalProgress = updatedContributions.reduce((sum, c) => sum + c.progress, 0) / (mission.teamId ? state.teams.find(t => t.id === mission.teamId)?.memberIds.length || 1 : 1);

    const updatedMission: Mission = {
      ...mission,
      contributions: updatedContributions,
      progress: Math.min(100, totalProgress),
    };

    dispatch({ type: 'UPDATE_MISSION', payload: updatedMission });
  };

  // Helper: Verificar badges
  const checkBadges = (userId: string) => {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;

    const completedMissions = state.missions.filter(
      m => m.assignedTo === userId && m.status === 'completed'
    ).length;

    // Verificar badges de misiones
    if (completedMissions >= 1 && !user.badges.includes('b1')) {
      user.badges.push('b1');
    }
    if (completedMissions >= 10 && !user.badges.includes('b3')) {
      user.badges.push('b3');
    }
    if (completedMissions >= 50 && !user.badges.includes('b5')) {
      user.badges.push('b5');
    }

    // Verificar badges de racha
    if (user.streak >= 7 && !user.badges.includes('b2')) {
      user.badges.push('b2');
      const notification: Notification = {
        id: `notif_${Date.now()}_${Math.random()}`,
        type: 'achievement',
        title: 'Nueva Insignia Desbloqueada',
        message: 'Has ganado la insignia "Racha de 7 días"',
        timestamp: new Date().toISOString(),
        read: false,
        userId,
      };
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    }
    if (user.streak >= 30 && !user.badges.includes('b4')) {
      user.badges.push('b4');
    }

    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  // Helper: Actualizar racha
  const updateStreak = (userId: string) => {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;

    // Por simplicidad, incrementamos la racha al completar una misión
    // En producción, esto debería verificar la última actividad del día
    const updatedUser: User = {
      ...user,
      streak: user.streak + 1,
    };

    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    checkBadges(userId);
  };

  // Helper: Logout
  const logout = () => {
    dispatch({ type: 'SET_CURRENT_USER', payload: null });
    storage.clearCurrentUser();
  };

  const value: AppContextType = {
    state,
    dispatch,
    currentUser,
    addXP,
    completeMission,
    acceptChallenge,
    startMission,
    updateMissionProgress,
    contributeToTeamMission,
    checkBadges,
    updateStreak,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

