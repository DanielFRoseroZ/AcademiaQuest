// Modelos de datos para AcademiaQuest

export interface User {
  id: string;
  name: string;
  avatar: string; // Iniciales
  level: number;
  xp: number; // XP total acumulado
  streak: number; // Días consecutivos
  teamId: string | null;
  badges: string[]; // IDs de badges
  email?: string;
  joinDate: string;
}

export interface Team {
  id: string;
  name: string;
  memberIds: string[];
  xpTotal: number; // Suma del XP de todos los miembros
  position: number; // Posición en ranking
  inviteCode?: string;
}

export type MissionStatus = 'available' | 'in_progress' | 'paused' | 'completed';
export type MissionType = 'task' | 'challenge' | 'team';
export type Difficulty = 'basico' | 'intermedio' | 'avanzado';

export interface Mission {
  id: string;
  title: string;
  type: MissionType;
  difficulty: Difficulty;
  progress: number; // 0-100
  rewardXp: number;
  deadline: string; // ISO date string
  assignedTo: string | null; // userId o null si es disponible
  status: MissionStatus;
  description?: string;
  teamId?: string; // Para misiones grupales
  contributions?: { userId: string; progress: number }[]; // Para misiones grupales
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  rewardXp: number;
  durationHours: number; // Duración del desafío
  participants: string[]; // userIds
  status: 'open' | 'in_progress' | 'completed' | 'expired';
  startTime?: string; // ISO date string cuando se acepta
  endTime?: string; // ISO date string
  attempts?: { userId: string; completed: boolean; timestamp: string }[];
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  description: string;
  condition: string; // Descripción de cómo obtenerlo
}

export interface XPEvent {
  id: string;
  type: 'mission_complete' | 'challenge_complete' | 'streak_bonus' | 'team_mission_complete' | 'weekly_goal';
  userId: string;
  amount: number;
  timestamp: string; // ISO date string
  sourceId?: string; // ID de misión/desafío que generó el XP
  description?: string;
}

export interface Notification {
  id: string;
  type: 'achievement' | 'xp' | 'team' | 'level' | 'mission' | 'challenge';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  userId: string;
}

export interface WeeklyGoal {
  current: number;
  target: number;
  xpBonus: number;
  weekStart: string; // ISO date string
  weekEnd: string; // ISO date string
}

