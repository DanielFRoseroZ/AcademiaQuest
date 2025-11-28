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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Mi Perfil</h1>
          <p className="text-gray-400">Revisa tu progreso y logros</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                {currentUser.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{currentUser.name}</h2>
                <p className="text-blue-400 font-semibold text-lg">{rank.name}</p>
                <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>Miembro desde {joinDate}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Posición Global</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">
                #{position}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Nivel {currentUser.level} - Progreso al Nivel {currentUser.level + 1}</span>
              <span className="text-white font-semibold">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colorMap = {
                blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
                orange: 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400',
                green: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400',
                purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
              };
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]} border rounded-xl p-4`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${colorMap[stat.color as keyof typeof colorMap].split(' ')[2]}`} />
                  <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                  <p className="text-white text-xl font-bold">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
          <div className="flex items-center space-x-2 mb-4">
            <Trophy className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Sistema de Rangos</h3>
          </div>
          <div className="space-y-3">
            {GAMIFICATION_CONFIG.ranks.map((rankItem, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all ${
                  rank.name === rankItem.name
                    ? `bg-gradient-to-r ${rankItem.color}/20 border-${rankItem.color.split('-')[1]}-500/50`
                    : 'bg-slate-700/30 border-slate-600/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-bold ${rank.name === rankItem.name ? 'text-white' : 'text-gray-400'}`}>
                      {rankItem.name}
                    </p>
                    <p className="text-gray-500 text-xs">Nivel {rankItem.minLevel}+</p>
                  </div>
                  {rank.name === rankItem.name && (
                    <Star className="w-5 h-5 text-yellow-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
        <div className="flex items-center space-x-2 mb-6">
          <Award className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Insignias y Logros</h2>
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
            {userBadges.length} / {allBadges.length}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border text-center transition-all ${
                badge.earned
                  ? 'bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border-yellow-500/50 hover:scale-105'
                  : 'bg-slate-700/30 border-slate-600/30 opacity-50'
              }`}
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
              <p className={`text-sm font-semibold mb-1 ${badge.earned ? 'text-white' : 'text-gray-500'}`}>
                {badge.title}
              </p>
              {badge.earned && (
                <p className="text-xs text-gray-400">{badge.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
