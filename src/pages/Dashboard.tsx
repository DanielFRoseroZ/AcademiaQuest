import { Star, Zap, TrendingUp, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GAMIFICATION_CONFIG } from '../config/gamification';
import ProgressBar from '../components/ProgressBar';
import StatCard from '../components/StatCard';
import MissionCard from '../components/MissionCard';
import AchievementBadge from '../components/AchievementBadge';
import { seedBadges } from '../data/seed';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, state } = useApp();
  const { showSuccess, toasts, removeToast } = useToast();

  if (!currentUser) {
    return null;
  }

  // Calcular estadísticas del usuario
  const nextLevelXP = GAMIFICATION_CONFIG.levelCalculation.getNextLevelXP(currentUser.level);
  const currentLevelXP = GAMIFICATION_CONFIG.levelCalculation.getCurrentLevelXP(
    currentUser.xp,
    currentUser.level
  );
  const rank = GAMIFICATION_CONFIG.getCurrentRank(currentUser.level);

  // Calcular posición en ranking
  const sortedUsers = [...state.users].sort((a, b) => b.xp - a.xp);
  const position = sortedUsers.findIndex(u => u.id === currentUser.id) + 1;

  // Misiones activas del usuario
  const activeMissions = state.missions
    .filter(m => m.assignedTo === currentUser.id && m.status === 'in_progress')
    .slice(0, 3);

  // Misiones grupales activas
  const teamMissions = state.missions
    .filter(m => m.type === 'team' && m.teamId === currentUser.teamId && m.status === 'in_progress')
    .slice(0, 3 - activeMissions.length);

  const allActiveMissions = [...activeMissions, ...teamMissions].slice(0, 3);

  // Badges recientes del usuario
  const userBadges = seedBadges.filter(b => currentUser.badges.includes(b.id));
  const recentAchievements = userBadges.slice(-3).reverse();

  // Misiones completadas
  const completedMissions = state.missions.filter(
    m => m.assignedTo === currentUser.id && m.status === 'completed'
  ).length;

  const handleAcceptWeeklyChallenge = () => {
    if (state.weeklyGoal && state.weeklyGoal.current < state.weeklyGoal.target) {
      showSuccess('Desafío Semanal', 'El desafío semanal ya está activo. ¡Sigue completando misiones!');
    } else {
      showSuccess('Desafío Semanal', '¡Desafío semanal aceptado! Completa 15 misiones para ganar 500 XP extra.');
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
            ¡Hola, {currentUser.name}! 👋
          </h1>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Continúa tu aventura de aprendizaje</p>
        </div>

        {/* Misiones Activas como foco principal */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-1">🎯 Mis Misiones Activas</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Continúa donde lo dejaste</p>
            </div>
            <button
              onClick={() => navigate('/missions')}
              className="text-blue-400 dark:text-blue-400 light:text-blue-600 hover:text-blue-300 dark:hover:text-blue-300 light:hover:text-blue-700 text-sm font-medium transition-colors"
            >
              Ver Todas →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {allActiveMissions.length > 0 ? (
              allActiveMissions.map((mission) => (
                <div key={mission.id} className="animate-fade-in">
                  <MissionCard mission={mission} />
                </div>
              ))
            ) : (
              <div className="col-span-3 bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700">
                <p className="text-gray-400 mb-4">No tienes misiones activas en este momento</p>
                <button 
                  onClick={() => navigate('/missions')} 
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30"
                >
                  Explorar Misiones Disponibles
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 dark:border-blue-500/20 light:border-blue-200 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-1">Nivel {currentUser.level}</h2>
                <p className="text-blue-400 dark:text-blue-400 light:text-blue-600 font-semibold text-lg">{rank.name}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">XP Total</p>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-400 dark:to-cyan-400 light:from-blue-600 light:to-indigo-600">
                  {currentUser.xp.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400 dark:text-gray-400 light:text-gray-600">Progreso al Nivel {currentUser.level + 1}</span>
                <span className="text-white dark:text-white light:text-gray-900 font-semibold">
                  {currentLevelXP} / {nextLevelXP} XP
                </span>
              </div>
              <ProgressBar
                progress={(currentLevelXP / nextLevelXP) * 100}
                color="blue"
                showGlow={true}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <StatCard
                icon={Target}
                label="Misiones"
                value={completedMissions}
                color="blue"
              />
              <StatCard
                icon={Zap}
                label="Racha"
                value={`${currentUser.streak} días`}
                color="orange"
              />
              <StatCard
                icon={TrendingUp}
                label="Posición"
                value={`#${position}`}
                color="green"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 dark:border-blue-500/20 light:border-blue-200 animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-6 h-6 text-yellow-400 dark:text-yellow-400 light:text-yellow-600" />
              <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">Logros Recientes</h3>
            </div>
            <div className="space-y-3">
              {recentAchievements.length > 0 ? (
                recentAchievements.map((badge) => (
                  <AchievementBadge
                    key={badge.id}
                    name={badge.title}
                    icon={badge.icon}
                    gradient="from-yellow-500 to-amber-500"
                  />
                ))
              ) : (
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Aún no has ganado insignias</p>
              )}
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="w-full mt-4 py-2 bg-slate-700/50 dark:bg-slate-700/50 light:bg-blue-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-blue-200 text-gray-300 dark:text-gray-300 light:text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              Ver Todas las Insignias
            </button>
          </div>
        </div>


        {state.weeklyGoal && (
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 dark:from-blue-600/20 dark:to-cyan-600/20 light:from-blue-100/50 light:to-cyan-100/50 border border-blue-500/30 dark:border-blue-500/30 light:border-blue-300 rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 dark:bg-blue-500/20 light:bg-blue-200 rounded-lg">
                <Star className="w-6 h-6 text-yellow-400 dark:text-yellow-400 light:text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white dark:text-white light:text-gray-900 mb-1">Desafío Semanal</h3>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">
                  Completa {state.weeklyGoal.target} misiones esta semana y gana {state.weeklyGoal.xpBonus} XP de bonificación
                </p>
                <div className="mt-2">
                  <ProgressBar
                    progress={(state.weeklyGoal.current / state.weeklyGoal.target) * 100}
                    color="blue"
                    height="sm"
                  />
                  <p className="text-white dark:text-white light:text-gray-900 text-sm mt-1">
                    {state.weeklyGoal.current} / {state.weeklyGoal.target} misiones completadas
                  </p>
                </div>
              </div>
              <button
                onClick={handleAcceptWeeklyChallenge}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30"
              >
                {state.weeklyGoal.current >= state.weeklyGoal.target ? 'Completado ✓' : 'Aceptar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
