import { BookOpen, Clock, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import MissionCard from '../components/MissionCard';
import ProgressBar from '../components/ProgressBar';

export default function Missions() {
  const { currentUser, state } = useApp();

  if (!currentUser) {
    return null;
  }

  // Misiones activas del usuario
  const activeMissions = state.missions.filter(
    m => m.assignedTo === currentUser.id && m.status === 'in_progress'
  );

  // Misiones grupales activas
  const teamMissions = state.missions.filter(
    m => m.type === 'team' && m.teamId === currentUser.teamId && m.status === 'in_progress'
  );

  // Misiones disponibles
  const availableMissions = state.missions.filter(
    m => m.status === 'available' && (m.type !== 'team' || m.teamId === currentUser.teamId)
  );

  const weeklyGoal = state.weeklyGoal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-2">Misiones</h1>
        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Completa misiones para ganar XP y subir de nivel</p>
      </div>

      {weeklyGoal && (
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 dark:from-blue-600/20 dark:to-cyan-600/20 light:from-blue-100/50 light:to-cyan-100/50 border border-blue-500/30 dark:border-blue-500/30 light:border-blue-300 rounded-2xl p-4 sm:p-6 mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white dark:text-white light:text-gray-900">Meta Semanal</h3>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">
                  Completa {weeklyGoal.target} misiones y gana {weeklyGoal.xpBonus} XP extra
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-gray-900">
                {weeklyGoal.current}/{weeklyGoal.target}
              </p>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Misiones</p>
            </div>
          </div>
          <ProgressBar
            progress={(weeklyGoal.current / weeklyGoal.target) * 100}
            color="blue"
            showGlow={true}
            height="lg"
          />
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-6 h-6 text-blue-400 dark:text-blue-400 light:text-blue-600" />
          <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Misiones Activas</h2>
          <span className="px-3 py-1 bg-blue-500/20 dark:bg-blue-500/20 light:bg-blue-100 text-blue-400 dark:text-blue-400 light:text-blue-700 rounded-full text-sm font-semibold">
            {activeMissions.length + teamMissions.length}
          </span>
        </div>
        {activeMissions.length + teamMissions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...activeMissions, ...teamMissions].map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-white/50 rounded-xl p-8 text-center border border-slate-700/50 dark:border-slate-700/50 light:border-gray-200">
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">No tienes misiones activas</p>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-6 h-6 text-green-400 dark:text-green-400 light:text-green-600" />
          <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Misiones Disponibles</h2>
          <span className="px-3 py-1 bg-green-500/20 dark:bg-green-500/20 light:bg-green-100 text-green-400 dark:text-green-400 light:text-green-700 rounded-full text-sm font-semibold">
            {availableMissions.length}
          </span>
        </div>
        {availableMissions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-white/50 rounded-xl p-8 text-center border border-slate-700/50 dark:border-slate-700/50 light:border-gray-200">
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">No hay misiones disponibles en este momento</p>
          </div>
        )}
      </div>

      <div className="mt-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-500/20 dark:border-green-500/20 light:border-green-200">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6 text-green-400 dark:text-green-400 light:text-green-600" />
          <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">Cómo Ganar XP</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg mt-1">
              <Zap className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white dark:text-white light:text-gray-900 font-semibold">Completa Tareas</p>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Gana entre 100-300 XP por tarea completada</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg mt-1">
              <Zap className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white font-semibold">Supera Retos</p>
              <p className="text-gray-400 text-sm">Los retos ofrecen hasta 500 XP</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg mt-1">
              <Zap className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white font-semibold">Trabaja en Equipo</p>
              <p className="text-gray-400 text-sm">Las misiones colaborativas dan bonos extra</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg mt-1">
              <Zap className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white font-semibold">Mantén tu Racha</p>
              <p className="text-gray-400 text-sm">Gana bonos diarios por actividad constante</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
