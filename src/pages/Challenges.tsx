import { useState } from 'react';
import { Zap, Trophy, Clock, Star, X, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Challenge } from '../types';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';

export default function Challenges() {
  const { currentUser, state, acceptChallenge } = useApp();
  const { showSuccess, toasts, removeToast } = useToast();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  if (!currentUser) {
    return null;
  }

  const challenges = state.challenges;

  const difficultyConfig = {
    basico: {
      bg: 'from-green-600/20 to-emerald-600/20',
      border: 'border-green-500/30',
      badge: 'bg-green-500/20 text-green-400',
      glow: 'shadow-green-500/20',
    },
    intermedio: {
      bg: 'from-yellow-600/20 to-orange-600/20',
      border: 'border-yellow-500/30',
      badge: 'bg-yellow-500/20 text-yellow-400',
      glow: 'shadow-yellow-500/20',
    },
    avanzado: {
      bg: 'from-red-600/20 to-pink-600/20',
      border: 'border-red-500/30',
      badge: 'bg-red-500/20 text-red-400',
      glow: 'shadow-red-500/20',
    },
  };

  const handleAcceptChallenge = (challenge: Challenge) => {
    if (challenge.participants.includes(currentUser.id)) {
      showSuccess('Ya participas', 'Ya estás participando en este desafío');
      return;
    }

    acceptChallenge(challenge.id);
    showSuccess('Desafío Aceptado', `Has aceptado: ${challenge.title}`);
    setSelectedChallenge(null);
  };

  const getTimeRemaining = (challenge: Challenge) => {
    if (!challenge.endTime) return null;
    const endTime = new Date(challenge.endTime);
    const now = new Date();
    const remaining = endTime.getTime() - now.getTime();
    
    if (remaining < 0) return 'Vencido';
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''}`;
    return 'Menos de 1 hora';
  };

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-2">Desafíos Semanales</h1>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Supera los retos más difíciles y demuestra tu dominio</p>
        </div>

        {/* Sección destacada de Retos Rápidos */}
        {challenges.find(c => c.id === 'c2') && (
          <div className="mb-8 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-orange-600/30 dark:from-purple-600/30 dark:via-pink-600/30 dark:to-orange-600/30 light:from-purple-100/80 light:via-pink-100/80 light:to-orange-100/80 border-2 border-purple-500/50 dark:border-purple-500/50 light:border-purple-300 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/20 light:shadow-purple-200/30 animate-pulse-slow">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-3 bg-purple-500/30 rounded-xl">
                    <Zap className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-1">⚡ Retos Rápidos</h2>
                    <p className="text-purple-200 dark:text-purple-200 light:text-purple-700 text-sm font-medium">Desafío de Velocidad Mental</p>
                  </div>
                </div>
                <p className="text-gray-200 dark:text-gray-200 light:text-gray-700 text-base sm:text-lg mb-4">
                  Pon a prueba tu agilidad mental completando ejercicios rápidos en tiempo récord. 
                  ¡Perfecto para practicar entre clases!
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-300 dark:text-yellow-300 light:text-yellow-600" />
                    <span className="text-white dark:text-white light:text-gray-900">Menos de 5 min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-300 dark:text-yellow-300 light:text-yellow-600" />
                    <span className="text-white dark:text-white light:text-gray-900">+300 XP</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-300 dark:text-yellow-300 light:text-yellow-600" />
                    <span className="text-white dark:text-white light:text-gray-900">Intermedio</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const quickChallenge = challenges.find(c => c.id === 'c2');
                  if (quickChallenge) {
                    setSelectedChallenge(quickChallenge);
                  }
                }}
                className="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-purple-500/50 dark:shadow-purple-500/50 light:shadow-purple-400/50 transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:shadow-purple-500/70 dark:hover:shadow-purple-500/70 light:hover:shadow-purple-400/70"
              >
                🚀 Iniciar Reto Rápido
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-5">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Star className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-white font-bold">Básico</h3>
            </div>
            <p className="text-gray-300 text-sm">Ideal para principiantes</p>
            <p className="text-green-400 text-2xl font-bold mt-2">100-200 XP</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-5">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-white font-bold">Intermedio</h3>
            </div>
            <p className="text-gray-300 text-sm">Requiere experiencia</p>
            <p className="text-yellow-400 text-2xl font-bold mt-2">300-400 XP</p>
          </div>

          <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 border border-red-500/30 rounded-xl p-5">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Trophy className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-white font-bold">Avanzado</h3>
            </div>
            <p className="text-gray-300 text-sm">Solo para expertos</p>
            <p className="text-red-400 text-2xl font-bold mt-2">500+ XP</p>
          </div>
        </div>

        <div className="space-y-4">
          {challenges.map((challenge) => {
            const config = difficultyConfig[challenge.difficulty];
            const isParticipating = challenge.participants.includes(currentUser.id);
            const timeRemaining = getTimeRemaining(challenge);

            return (
              <div
                key={challenge.id}
                className={`bg-gradient-to-br ${config.bg} backdrop-blur-sm rounded-2xl p-4 sm:p-6 border ${config.border} hover:shadow-xl ${config.glow} transition-all duration-300 ease-out hover:-translate-y-1 transform`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-gray-900">{challenge.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.badge}`}>
                        {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                      </span>
                      {isParticipating && (
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                          Participando
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-base sm:text-lg">{challenge.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center space-x-1 mb-1">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="text-2xl font-bold text-white">+{challenge.rewardXp}</span>
                    </div>
                    <p className="text-gray-400 text-sm">XP</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-slate-700/50 dark:border-slate-700/50 light:border-gray-200 gap-3 sm:gap-0">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">
                        {timeRemaining || `${challenge.durationHours} horas`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{challenge.participants.length} participantes</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedChallenge(challenge)}
                    disabled={isParticipating || challenge.status !== 'open'}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-300 ease-out shadow-lg shadow-blue-500/30 dark:shadow-blue-500/30 light:shadow-blue-400/30 hover:scale-105"
                  >
                    {isParticipating ? 'Participando' : 'Aceptar Desafío'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedChallenge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-blue-500/20 shadow-2xl max-w-md w-full p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Confirmar Desafío</h2>
                <button
                  onClick={() => setSelectedChallenge(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p className="text-gray-300 mb-6">
                ¿Estás seguro de que quieres aceptar el desafío <strong>{selectedChallenge.title}</strong>?
                Tendrás {selectedChallenge.durationHours} horas para completarlo.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedChallenge(null)}
                  className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleAcceptChallenge(selectedChallenge)}
                  className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
          <h3 className="text-xl font-bold text-white mb-4">Reglas de los Desafíos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="text-white font-semibold">Tiempo Limitado</p>
                <p className="text-gray-400 text-sm">Cada desafío tiene un límite de tiempo específico</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="text-white font-semibold">Sin Errores</p>
                <p className="text-gray-400 text-sm">Algunos desafíos requieren precisión total</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="text-white font-semibold">Bonos Extra</p>
                <p className="text-gray-400 text-sm">Completar antes del tiempo da XP adicional</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <p className="text-white font-semibold">Intentos Ilimitados</p>
                <p className="text-gray-400 text-sm">Puedes reintentar hasta completar el desafío</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
