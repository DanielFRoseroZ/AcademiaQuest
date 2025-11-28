import { X, Play, CheckCircle2, Plus, Minus } from 'lucide-react';
import { Mission } from '../types';
import { useApp } from '../context/AppContext';
import ProgressBar from './ProgressBar';
import { useToast } from '../hooks/useToast';

interface MissionModalProps {
  mission: Mission;
  onClose: () => void;
}

export default function MissionModal({ mission, onClose }: MissionModalProps) {
  const { currentUser, startMission, updateMissionProgress, completeMission } = useApp();
  const { showSuccess } = useToast();

  if (!currentUser) return null;

  const typeLabels = {
    task: 'Tarea',
    challenge: 'Reto',
    team: 'Equipo',
  };

  const difficultyLabels = {
    basico: 'Básico',
    intermedio: 'Intermedio',
    avanzado: 'Avanzado',
  };

  const handleStart = () => {
    if (mission.status === 'available') {
      startMission(mission.id);
      showSuccess('Misión Iniciada', `Has comenzado: ${mission.title}`);
    }
    onClose();
  };

  const handleUpdateProgress = (delta: number) => {
    const newProgress = Math.min(100, Math.max(0, mission.progress + delta));
    updateMissionProgress(mission.id, newProgress);
  };

  const handleComplete = () => {
    if (mission.progress >= 100) {
      completeMission(mission.id);
      showSuccess('¡Misión Completada!', `Has ganado ${mission.rewardXp} XP`);
      onClose();
    } else {
      showSuccess('Progreso Insuficiente', 'Completa al menos el 100% para finalizar la misión');
    }
  };

  const deadlineDate = new Date(mission.deadline);
  const now = new Date();
  const timeRemaining = deadlineDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60));

  const getTimeRemainingText = () => {
    if (timeRemaining < 0) return 'Vencida';
    if (daysRemaining > 0) return `${daysRemaining} día${daysRemaining > 1 ? 's' : ''}`;
    if (hoursRemaining > 0) return `${hoursRemaining} hora${hoursRemaining > 1 ? 's' : ''}`;
    return 'Menos de 1 hora';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-blue-500/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  mission.type === 'task' ? 'bg-blue-500/20 text-blue-400' :
                  mission.type === 'challenge' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {typeLabels[mission.type]}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  mission.difficulty === 'basico' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                  mission.difficulty === 'intermedio' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                  'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {difficultyLabels[mission.difficulty]}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{mission.title}</h2>
              {mission.description && (
                <p className="text-gray-300 mb-4">{mission.description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors ml-4"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Progreso</span>
              <span className="text-white font-semibold">{mission.progress}%</span>
            </div>
            <ProgressBar progress={mission.progress} color="blue" showGlow={true} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Recompensa</p>
              <p className="text-2xl font-bold text-yellow-400">+{mission.rewardXp} XP</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Tiempo Restante</p>
              <p className="text-xl font-bold text-white">{getTimeRemainingText()}</p>
            </div>
          </div>

          {mission.status === 'available' && (
            <button
              onClick={handleStart}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Iniciar Misión</span>
            </button>
          )}

          {mission.status === 'in_progress' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateProgress(-10)}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                  disabled={mission.progress <= 0}
                >
                  <Minus className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1 text-center">
                  <button
                    onClick={() => handleUpdateProgress(10)}
                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors font-semibold"
                  >
                    +10% Progreso
                  </button>
                </div>
                <button
                  onClick={() => handleUpdateProgress(10)}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                  disabled={mission.progress >= 100}
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
              <button
                onClick={handleComplete}
                disabled={mission.progress < 100}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-green-500/30 flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Completar Misión</span>
              </button>
            </div>
          )}

          {mission.status === 'completed' && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 font-semibold">Misión Completada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

