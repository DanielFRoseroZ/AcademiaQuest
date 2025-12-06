import { User, Team, Mission, Challenge, Badge, WeeklyGoal } from '../types';

// Seed data para AcademiaQuest

export const seedBadges: Badge[] = [
  {
    id: 'b1',
    title: 'Primera Misión',
    icon: 'star',
    description: 'Completa tu primera misión',
    condition: 'Completa 1 misión',
  },
  {
    id: 'b2',
    title: 'Racha de 7 días',
    icon: 'fire',
    description: 'Mantén una racha de 7 días consecutivos',
    condition: 'Racha de 7 días',
  },
  {
    id: 'b3',
    title: '10 Misiones Completadas',
    icon: 'target',
    description: 'Completa 10 misiones',
    condition: 'Completa 10 misiones',
  },
  {
    id: 'b4',
    title: 'Racha de 30 días',
    icon: 'zap',
    description: 'Mantén una racha de 30 días consecutivos',
    condition: 'Racha de 30 días',
  },
  {
    id: 'b5',
    title: '50 Misiones',
    icon: 'trophy',
    description: 'Completa 50 misiones',
    condition: 'Completa 50 misiones',
  },
  {
    id: 'b6',
    title: 'Colaborador',
    icon: 'users',
    description: 'Completa 5 misiones grupales',
    condition: '5 misiones de equipo',
  },
  {
    id: 'b7',
    title: 'Top 10',
    icon: 'medal',
    description: 'Alcanza el top 10 del ranking',
    condition: 'Posición #10 o mejor',
  },
  {
    id: 'b8',
    title: 'Primera Posición Semanal',
    icon: 'crown',
    description: 'Alcanza el #1 en el ranking semanal',
    condition: 'Posición #1 semanal',
  },
];

export const seedUsers: User[] = [
  {
    id: 'u1',
    name: 'Miguel',
    avatar: 'MG',
    level: 12,
    xp: 15420,
    streak: 7,
    teamId: 't1',
    badges: ['b1', 'b2', 'b3'],
    email: 'miguel@example.com',
    joinDate: '2025-01-15',
  },
  {
    id: 'u2',
    name: 'Ana García',
    avatar: 'AG',
    level: 15,
    xp: 18500,
    streak: 12,
    teamId: 't1',
    badges: ['b1', 'b2', 'b3', 'b4', 'b7'],
    email: 'ana@example.com',
    joinDate: '2024-12-10',
  },
  {
    id: 'u3',
    name: 'Carlos Ruiz',
    avatar: 'CR',
    level: 14,
    xp: 17200,
    streak: 5,
    teamId: 't1',
    badges: ['b1', 'b2', 'b3'],
    email: 'carlos@example.com',
    joinDate: '2024-12-20',
  },
  {
    id: 'u4',
    name: 'María López',
    avatar: 'ML',
    level: 14,
    xp: 16800,
    streak: 8,
    teamId: 't1',
    badges: ['b1', 'b2', 'b3', 'b6'],
    email: 'maria@example.com',
    joinDate: '2024-12-15',
  },
  {
    id: 'u5',
    name: 'David Martín',
    avatar: 'DM',
    level: 13,
    xp: 15900,
    streak: 3,
    teamId: 't2',
    badges: ['b1', 'b2'],
    email: 'david@example.com',
    joinDate: '2025-01-05',
  },
  {
    id: 'u6',
    name: 'Laura Sánchez',
    avatar: 'LS',
    level: 13,
    xp: 15600,
    streak: 6,
    teamId: 't2',
    badges: ['b1', 'b2', 'b3'],
    email: 'laura@example.com',
    joinDate: '2025-01-08',
  },
  {
    id: 'u7',
    name: 'Pedro Jiménez',
    avatar: 'PJ',
    level: 12,
    xp: 15400,
    streak: 4,
    teamId: null,
    badges: ['b1', 'b2'],
    email: 'pedro@example.com',
    joinDate: '2025-01-10',
  },
  {
    id: 'u8',
    name: 'Sofía Torres',
    avatar: 'ST',
    level: 12,
    xp: 15300,
    streak: 9,
    teamId: 't2',
    badges: ['b1', 'b2', 'b3'],
    email: 'sofia@example.com',
    joinDate: '2025-01-12',
  },
  {
    id: 'u9',
    name: 'Miguel Ángel',
    avatar: 'MA',
    level: 11,
    xp: 14200,
    streak: 2,
    teamId: null,
    badges: ['b1'],
    email: 'miguel.angel@example.com',
    joinDate: '2025-01-18',
  },
  {
    id: 'u10',
    name: 'Elena Vega',
    avatar: 'EV',
    level: 11,
    xp: 13800,
    streak: 5,
    teamId: 't2',
    badges: ['b1', 'b2'],
    email: 'elena@example.com',
    joinDate: '2025-01-20',
  },
];

export const seedTeams: Team[] = [
  {
    id: 't1',
    name: 'Los Innovadores',
    memberIds: ['u1', 'u2', 'u3', 'u4'],
    xpTotal: 67920, // Suma de u1+u2+u3+u4
    position: 3,
    inviteCode: 'INNOV2025',
  },
  {
    id: 't2',
    name: 'Cerebros Unidos',
    memberIds: ['u5', 'u6', 'u8', 'u10'],
    xpTotal: 60700,
    position: 2,
    inviteCode: 'CEREBROS2025',
  },
];

export const seedMissions: Mission[] = [
  // Misiones activas del usuario u1
  {
    id: 'm1',
    title: 'Álgebra Lineal: Matrices',
    type: 'task',
    difficulty: 'intermedio',
    progress: 75,
    rewardXp: 150,
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días
    assignedTo: 'u1',
    status: 'in_progress',
    description: 'Practica con ejercicios de matrices y determinantes. Resuelve al menos 5 problemas de suma, resta y multiplicación de matrices. ¡Domina esta herramienta matemática esencial!',
  },
  {
    id: 'm2',
    title: 'Quiz de Historia Mundial',
    type: 'challenge',
    difficulty: 'avanzado',
    progress: 30,
    rewardXp: 200,
    deadline: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 horas
    assignedTo: 'u1',
    status: 'in_progress',
    description: 'Demuestra tus conocimientos históricos respondiendo correctamente al menos 8 de cada 10 preguntas. El quiz cubre desde la Antigüedad hasta la Edad Moderna. ¡Pon a prueba tu memoria histórica!',
  },
  {
    id: 'm3',
    title: 'Proyecto Colaborativo',
    type: 'team',
    difficulty: 'intermedio',
    progress: 60,
    rewardXp: 300,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 semana
    assignedTo: null,
    status: 'in_progress',
    teamId: 't1',
    description: 'Trabaja con tu equipo para crear una presentación sobre energía renovable. Cada miembro debe investigar un tipo de energía (solar, eólica, hidráulica) y crear una diapositiva. ¡La colaboración es clave!',
    contributions: [
      { userId: 'u1', progress: 20 },
      { userId: 'u2', progress: 25 },
      { userId: 'u3', progress: 15 },
    ],
  },
  {
    id: 'm4',
    title: 'Introducción a Python',
    type: 'task',
    difficulty: 'basico',
    progress: 20,
    rewardXp: 100,
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días
    assignedTo: 'u1',
    status: 'in_progress',
    description: 'Aprende los fundamentos de Python completando los primeros 5 ejercicios prácticos. Cubrirás variables, tipos de datos, operadores y estructuras básicas. ¡Tu primer paso en programación!',
  },
  // Misiones disponibles
  {
    id: 'm5',
    title: 'Física Cuántica: Conceptos Básicos',
    type: 'task',
    difficulty: 'avanzado',
    progress: 0,
    rewardXp: 250,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: null,
    status: 'available',
    description: 'Sumérgete en el fascinante mundo de la física cuántica. Estudia los principios fundamentales: dualidad onda-partícula, principio de incertidumbre y superposición cuántica. Completa un resumen de 500 palabras sobre estos conceptos.',
  },
  {
    id: 'm6',
    title: 'Redacción Académica',
    type: 'challenge',
    difficulty: 'intermedio',
    progress: 0,
    rewardXp: 180,
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: null,
    status: 'available',
    description: 'Desarrolla tus habilidades de escritura académica creando un ensayo de 1000 palabras sobre un tema de tu elección. Debe incluir introducción, desarrollo con argumentos sólidos y conclusión. ¡Demuestra tu capacidad de análisis y expresión escrita!',
  },
  {
    id: 'm7',
    title: 'Proyecto de Física Aplicada',
    type: 'team',
    difficulty: 'intermedio',
    progress: 65,
    rewardXp: 250,
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: null,
    status: 'in_progress',
    teamId: 't1',
    description: 'Colabora con tu equipo para investigar y presentar un proyecto de física aplicada. Cada miembro debe explicar un fenómeno físico diferente (movimiento, energía, ondas) con ejemplos prácticos de la vida cotidiana. ¡Aprendan juntos!',
    contributions: [
      { userId: 'u1', progress: 20 },
      { userId: 'u2', progress: 25 },
      { userId: 'u3', progress: 20 },
    ],
  },
  {
    id: 'm8',
    title: 'Investigación Histórica',
    type: 'team',
    difficulty: 'intermedio',
    progress: 40,
    rewardXp: 200,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: null,
    status: 'in_progress',
    teamId: 't1',
    description: 'Investiga junto a tu equipo sobre la Revolución Industrial. Cada miembro debe investigar un aspecto diferente: causas, inventos importantes, impacto social o consecuencias. Creen un documento colaborativo con todas las secciones.',
    contributions: [
      { userId: 'u2', progress: 25 },
      { userId: 'u4', progress: 15 },
    ],
  },
];

export const seedChallenges: Challenge[] = [
  {
    id: 'c1',
    title: 'Maestro de Matemáticas',
    description: 'Resuelve 20 problemas de cálculo sin errores',
    difficulty: 'avanzado',
    rewardXp: 500,
    durationHours: 48,
    participants: ['u1', 'u5'],
    status: 'open',
  },
  {
    id: 'c2',
    title: 'Velocidad Mental',
    description: 'Pon a prueba tu agilidad mental completando 10 ejercicios rápidos de matemáticas, lógica y memoria en menos de 5 minutos. Ideal para entrenar tu cerebro entre clases. ¡Cada segundo cuenta!',
    difficulty: 'intermedio',
    rewardXp: 300,
    durationHours: 24,
    participants: ['u2', 'u3', 'u6'],
    status: 'open',
  },
  {
    id: 'c3',
    title: 'Colaboración Suprema',
    description: 'Completa 3 proyectos grupales esta semana',
    difficulty: 'basico',
    rewardXp: 400,
    durationHours: 168, // 1 semana
    participants: ['u1', 'u2', 'u3', 'u4'],
    status: 'open',
  },
];

export const getWeeklyGoal = (): WeeklyGoal => {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay()); // Domingo
  weekStart.setHours(0, 0, 0, 0);
  
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);
  
  return {
    current: 8,
    target: 15,
    xpBonus: 500,
    weekStart: weekStart.toISOString(),
    weekEnd: weekEnd.toISOString(),
  };
};

