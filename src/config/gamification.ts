/**
 * Configuración de gamificación para AcademiaQuest
 * 
 * Este archivo permite ajustar fácilmente los parámetros de gamificación
 * para experimentos A/B y balanceo del juego.
 */

// ===== CÁLCULO DE NIVELES =====
/**
 * Fórmula para calcular el nivel basado en XP total
 * Por defecto: level = floor(sqrt(xp / 1000) * 2)
 * 
 * Alternativas:
 * - Lineal: level = floor(xp / 1000)
 * - Exponencial: level = floor(log2(xp / 500))
 */
export const calculateLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 1000) * 2);
};

/**
 * Calcula el XP necesario para alcanzar un nivel específico
 */
export const getXPForLevel = (level: number): number => {
  return Math.floor(Math.pow(level / 2, 2) * 1000);
};

/**
 * Calcula el XP del siguiente nivel
 */
export const getNextLevelXP = (currentLevel: number): number => {
  return getXPForLevel(currentLevel + 1);
};

/**
 * Calcula el XP actual dentro del nivel (no el total)
 */
export const getCurrentLevelXP = (totalXP: number, level: number): number => {
  const xpForCurrentLevel = getXPForLevel(level);
  return totalXP - xpForCurrentLevel;
};

// ===== BONOS POR RACHA =====
/**
 * Configuración de bonos por racha diaria
 */
export const STREAK_CONFIG = {
  // Porcentaje de bonus XP por cada día de racha
  bonusPerDay: 0.02, // 2% por día
  // Tope máximo de bonus (20% = 10 días)
  maxBonus: 0.20, // 20%
  // Días necesarios para hitos de badges
  milestones: [7, 30, 60, 100],
};

/**
 * Calcula el bonus de XP basado en la racha
 */
export const calculateStreakBonus = (streak: number): number => {
  const bonus = Math.min(streak * STREAK_CONFIG.bonusPerDay, STREAK_CONFIG.maxBonus);
  return bonus;
};

/**
 * Aplica el bonus de racha al XP ganado
 */
export const applyStreakBonus = (baseXP: number, streak: number): number => {
  const bonus = calculateStreakBonus(streak);
  return Math.floor(baseXP * (1 + bonus));
};

// ===== RECOMPENSAS POR DIFICULTAD =====
export const DIFFICULTY_XP_MULTIPLIER = {
  basico: 1.0,
  intermedio: 1.5,
  avanzado: 2.0,
};

/**
 * Calcula el XP base según la dificultad
 */
export const getBaseXPByDifficulty = (difficulty: 'basico' | 'intermedio' | 'avanzado'): number => {
  const base = 100;
  return Math.floor(base * DIFFICULTY_XP_MULTIPLIER[difficulty]);
};

// ===== RECOMPENSAS POR TIPO DE MISIÓN =====
export const MISSION_TYPE_XP = {
  task: 1.0, // Base
  challenge: 1.3, // 30% más
  team: 1.2, // 20% más (y se comparte entre miembros)
};

// ===== META SEMANAL =====
export const WEEKLY_GOAL_CONFIG = {
  targetMissions: 15,
  bonusXP: 500,
};

// ===== RANGOS =====
export interface Rank {
  name: string;
  minLevel: number;
  color: string;
}

export const RANKS: Rank[] = [
  { name: 'Explorador', minLevel: 1, color: 'from-gray-500 to-gray-600' },
  { name: 'Aprendiz Activo', minLevel: 5, color: 'from-green-500 to-emerald-600' },
  { name: 'Retador', minLevel: 10, color: 'from-blue-500 to-cyan-600' },
  { name: 'Maestro del Conocimiento', minLevel: 20, color: 'from-purple-500 to-pink-600' },
];

/**
 * Obtiene el rango actual basado en el nivel
 */
export const getCurrentRank = (level: number): Rank => {
  return RANKS.filter(r => level >= r.minLevel).pop() || RANKS[0];
};

// ===== CONFIGURACIÓN DE BADGES =====
export const BADGE_CONDITIONS = {
  // Misiones completadas
  'first_mission': { type: 'missions_completed', value: 1 },
  'ten_missions': { type: 'missions_completed', value: 10 },
  'fifty_missions': { type: 'missions_completed', value: 50 },
  'hundred_missions': { type: 'missions_completed', value: 100 },
  
  // Rachas
  'streak_7': { type: 'streak', value: 7 },
  'streak_30': { type: 'streak', value: 30 },
  'streak_60': { type: 'streak', value: 60 },
  'streak_100': { type: 'streak', value: 100 },
  
  // Niveles
  'level_10': { type: 'level', value: 10 },
  'level_20': { type: 'level', value: 20 },
  'level_30': { type: 'level', value: 30 },
  
  // Ranking
  'top_10': { type: 'ranking', value: 10 },
  'top_5': { type: 'ranking', value: 5 },
  'top_1': { type: 'ranking', value: 1 },
  
  // Equipos
  'team_player': { type: 'team_missions', value: 5 },
  'team_leader': { type: 'team_missions', value: 20 },
};

// ===== EXPORTAR CONFIGURACIÓN COMPLETA =====
export const GAMIFICATION_CONFIG = {
  levelCalculation: {
    calculateLevel,
    getXPForLevel,
    getNextLevelXP,
    getCurrentLevelXP,
  },
  streak: {
    ...STREAK_CONFIG,
    calculateStreakBonus,
    applyStreakBonus,
  },
  difficulty: {
    multipliers: DIFFICULTY_XP_MULTIPLIER,
    getBaseXPByDifficulty,
  },
  missionTypes: MISSION_TYPE_XP,
  weeklyGoal: WEEKLY_GOAL_CONFIG,
  ranks: RANKS,
  getCurrentRank,
  badges: BADGE_CONDITIONS,
};

