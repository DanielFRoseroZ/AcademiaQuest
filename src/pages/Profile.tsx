import { Trophy, Star, Zap, Target, Award, TrendingUp, Calendar, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GAMIFICATION_CONFIG } from '../config/gamification';
import { seedBadges } from '../data/seed';
import ProgressBar from '../components/ProgressBar';

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, state, logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) {
    return null;
  }

  // Calcular estadísticas
  const nextLevelXP = GAMIFICATION_CONFIG.levelCalculation.getNextLevelXP(currentUser.level);
  const currentLevelXP = GAMIFICATION_CONFIG.levelCalculation.getCurrentLevelXP(
    currentUser.xp,
    currentUser.level
  );
  const rank = GAMIFICATION_CONFIG.getCurrentRank(currentUser.level);

  // Calcular posición en ranking
  const sortedUsers = [...state.users].sort((a, b) => b.xp - a.xp);
  const position = sortedUsers.findIndex(u => u.id === currentUser.id) + 1;

  // Misiones completadas por tipo
  const completedMissions = state.missions.filter(
    m => m.assignedTo === currentUser.id && m.status === 'completed'
  );
  const tasksCompleted = completedMissions.filter(m => m.type === 'task').length;
  const challengesCompleted = completedMissions.filter(m => m.type === 'challenge').length;
  const teamMissionsCompleted = completedMissions.filter(m => m.type === 'team').length;

  // Badges del usuario
  const userBadges = seedBadges.filter(b => currentUser.badges.includes(b.id));
  const allBadges = seedBadges.map(badge => ({
    ...badge,
    earned: currentUser.badges.includes(badge.id),
  }));

  // Formatear fecha de unión
  const joinDate = currentUser.joinDate
    ? new Date(currentUser.joinDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
    : 'Reciente';

  const stats = [
    { label: 'Tareas Completadas', value: tasksCompleted.toString(), icon: Target, color: 'blue' },
    { label: 'Retos Superados', value: challengesCompleted.toString(), icon: Zap, color: 'orange' },
    { label: 'Proyectos Grupales', value: teamMissionsCompleted.toString(), icon: Award, color: 'green' },
    { label: 'Racha Actual', value: `${currentUser.streak} días`, icon: TrendingUp, color: 'purple' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Revisa tu progreso y logros</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 dark:bg-red-500/20 light:bg-red-100 hover:bg-red-500/30 dark:hover:bg-red-500/30 light:hover:bg-red-200 border border-red-500/50 dark:border-red-500/50 light:border-red-300 text-red-400 dark:text-red-400 light:text-red-700 rounded-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-500/20 dark:border-blue-500/20 light:border-blue-200 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                {currentUser.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-1">{currentUser.name}</h2>
                <p className="text-blue-400 dark:text-blue-400 light:text-blue-600 font-semibold text-lg">{rank.name}</p>
                <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>Miembro desde {joinDate}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Posición Global</p>
              <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400 dark:from-yellow-400 dark:to-amber-400 light:from-yellow-600 light:to-amber-600">
                #{position}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400 dark:text-gray-400 light:text-gray-600">Nivel {currentUser.level} - Progreso al Nivel {currentUser.level + 1}</span>
              <span className="text-white dark:text-white light:text-gray-900 font-semibold">
                {currentLevelXP} / {nextLevelXP} XP
              </span>
            </div>
            <ProgressBar
              progress={(currentLevelXP / nextLevelXP) * 100}
              color="blue"
              showGlow={true}
              height="lg"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colorMap = {
                blue: {
                  bg: 'from-blue-500/20 to-cyan-500/20 dark:from-blue-500/20 dark:to-cyan-500/20 light:from-blue-100/50 light:to-cyan-100/50',
                  border: 'border-blue-500/30 dark:border-blue-500/30 light:border-blue-200',
                  text: 'text-blue-400 dark:text-blue-400 light:text-blue-700',
                  label: 'text-gray-400 dark:text-gray-400 light:text-gray-600',
                  value: 'text-white dark:text-white light:text-gray-900'
                },
                orange: {
                  bg: 'from-orange-500/20 to-red-500/20 dark:from-orange-500/20 dark:to-red-500/20 light:from-orange-100/50 light:to-red-100/50',
                  border: 'border-orange-500/30 dark:border-orange-500/30 light:border-orange-200',
                  text: 'text-orange-400 dark:text-orange-400 light:text-orange-700',
                  label: 'text-gray-400 dark:text-gray-400 light:text-gray-600',
                  value: 'text-white dark:text-white light:text-gray-900'
                },
                green: {
                  bg: 'from-green-500/20 to-emerald-500/20 dark:from-green-500/20 dark:to-emerald-500/20 light:from-green-100/50 light:to-emerald-100/50',
                  border: 'border-green-500/30 dark:border-green-500/30 light:border-green-200',
                  text: 'text-green-400 dark:text-green-400 light:text-green-700',
                  label: 'text-gray-400 dark:text-gray-400 light:text-gray-600',
                  value: 'text-white dark:text-white light:text-gray-900'
                },
                purple: {
                  bg: 'from-purple-500/20 to-pink-500/20 dark:from-purple-500/20 dark:to-pink-500/20 light:from-purple-100/50 light:to-pink-100/50',
                  border: 'border-purple-500/30 dark:border-purple-500/30 light:border-purple-200',
                  text: 'text-purple-400 dark:text-purple-400 light:text-purple-700',
                  label: 'text-gray-400 dark:text-gray-400 light:text-gray-600',
                  value: 'text-white dark:text-white light:text-gray-900'
                },
              };
              const colors = colorMap[stat.color as keyof typeof colorMap];
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl p-4 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className={`w-5 h-5 mb-2 ${colors.text}`} />
                  <p className={`${colors.label} text-xs mb-1`}>{stat.label}</p>
                  <p className={`${colors.value} text-xl font-bold`}>{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20 dark:border-purple-500/20 light:border-purple-200 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center space-x-2 mb-4">
            <Trophy className="w-6 h-6 text-purple-400 dark:text-purple-400 light:text-purple-600" />
            <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">Sistema de Rangos</h3>
          </div>
          <div className="space-y-3">
            {GAMIFICATION_CONFIG.ranks.map((rankItem, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 ease-out hover:scale-105 ${
                  rank.name === rankItem.name
                    ? `bg-gradient-to-r ${rankItem.color}/20 dark:${rankItem.color}/20 light:${rankItem.color.replace('from-', 'from-').replace('to-', 'to-').split(' ')[0].replace('from-', '')}-100/50 border-${rankItem.color.split('-')[1]}-500/50 dark:border-${rankItem.color.split('-')[1]}-500/50 light:border-${rankItem.color.split('-')[1]}-300 shadow-lg`
                    : 'bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 border-slate-600/30 dark:border-slate-600/30 light:border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-bold ${rank.name === rankItem.name ? 'text-white dark:text-white light:text-gray-900' : 'text-gray-400 dark:text-gray-400 light:text-gray-600'}`}>
                      {rankItem.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 light:text-gray-500 text-xs">Nivel {rankItem.minLevel}+</p>
                  </div>
                  {rank.name === rankItem.name && (
                    <Star className="w-5 h-5 text-yellow-400 dark:text-yellow-400 light:text-yellow-600 animate-pulse-slow" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-yellow-500/20 dark:border-yellow-500/20 light:border-yellow-200 animate-fade-in">
        <div className="flex items-center space-x-2 mb-6">
          <Award className="w-6 h-6 text-yellow-400 dark:text-yellow-400 light:text-yellow-600" />
          <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Insignias y Logros</h2>
          <span className="px-3 py-1 bg-yellow-500/20 dark:bg-yellow-500/20 light:bg-yellow-100 text-yellow-400 dark:text-yellow-400 light:text-yellow-700 rounded-full text-sm font-semibold">
            {userBadges.length} / {allBadges.length}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {allBadges.map((badge, index) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border text-center transition-all duration-300 ease-out ${
                badge.earned
                  ? 'bg-gradient-to-br from-yellow-500/20 to-amber-600/20 dark:from-yellow-500/20 dark:to-amber-600/20 light:from-yellow-100/50 light:to-amber-100/50 border-yellow-500/50 dark:border-yellow-500/50 light:border-yellow-300 hover:scale-110 hover:shadow-xl animate-fade-in'
                  : 'bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 border-slate-600/30 dark:border-slate-600/30 light:border-gray-200 opacity-50 hover:opacity-75'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  badge.earned
                    ? 'bg-gradient-to-br from-yellow-400 to-amber-600 shadow-lg shadow-yellow-500/30'
                    : 'bg-slate-600'
                }`}
              >
                <Award className="w-8 h-8 text-white" />
              </div>
              <p className={`text-sm font-semibold mb-1 ${badge.earned ? 'text-white dark:text-white light:text-gray-900' : 'text-gray-500 dark:text-gray-500 light:text-gray-500'}`}>
                {badge.title}
              </p>
              {badge.earned && (
                <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">{badge.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
