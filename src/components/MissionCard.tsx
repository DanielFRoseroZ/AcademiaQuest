import { useState } from 'react';
import { Clock, Zap } from 'lucide-react';
import { Mission } from '../types';
import ProgressBar from './ProgressBar';
import MissionModal from './MissionModal';

interface MissionCardProps {
  mission: Mission;
}

export default function MissionCard({ mission }: MissionCardProps) {
  const [showModal, setShowModal] = useState(false);

  const difficultyColors = {
    basico: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermedio: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    avanzado: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const typeLabels = {
    task: 'Tarea',
    challenge: 'Reto',
    team: 'Equipo',
  };

  const typeColors = {
    task: 'bg-blue-500/20 text-blue-400',
    challenge: 'bg-purple-500/20 text-purple-400',
    team: 'bg-cyan-500/20 text-cyan-400',
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
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-slate-800/80 dark:bg-slate-800/80 light:bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-slate-700 dark:border-slate-700 light:border-gray-200 hover:border-blue-500/50 dark:hover:border-blue-500/50 light:hover:border-blue-400 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/10 light:hover:shadow-blue-200/30 hover:-translate-y-1 cursor-pointer transform"
      >
        <div className="flex items-start justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[mission.type]}`}>
            {typeLabels[mission.type]}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${difficultyColors[mission.difficulty]}`}>
            {mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1)}
          </span>
        </div>

        <h3 className="text-white dark:text-white light:text-gray-900 font-bold text-lg mb-3 leading-tight">{mission.title}</h3>

        <div className="mb-3">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400 dark:text-gray-400 light:text-gray-600">Progreso</span>
            <span className="text-white dark:text-white light:text-gray-900 font-semibold">{mission.progress}%</span>
          </div>
          <ProgressBar progress={mission.progress} color="blue" height="sm" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-700 dark:border-slate-700 light:border-gray-200">
          <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-400 light:text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-xs">{getTimeRemainingText()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4 text-yellow-400 dark:text-yellow-400 light:text-yellow-600" />
            <span className="text-white dark:text-white light:text-gray-900 font-bold text-sm">+{mission.rewardXp} XP</span>
          </div>
        </div>
      </div>

      {showModal && <MissionModal mission={mission} onClose={() => setShowModal(false)} />}
    </>
  );
}
