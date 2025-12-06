import { Trophy, TrendingUp, Medal, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Ranking() {
  const { currentUser, state } = useApp();

  if (!currentUser) {
    return null;
  }

  // Ordenar usuarios por XP
  const sortedUsers = [...state.users].sort((a, b) => b.xp - a.xp);

  // Ordenar equipos por XP total
  const sortedTeams = [...state.teams].sort((a, b) => b.xpTotal - a.xpTotal);

  const getMedalColor = (position: number) => {
    if (position === 1) return 'from-yellow-400 to-yellow-600';
    if (position === 2) return 'from-gray-300 to-gray-400';
    if (position === 3) return 'from-amber-600 to-amber-800';
    return 'from-slate-600 to-slate-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-2">Ranking</h1>
        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Compite con otros estudiantes y equipos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-500/20 dark:border-blue-500/20 light:border-blue-200 animate-slide-up">
          <div className="flex items-center space-x-2 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400 dark:text-yellow-400 light:text-yellow-600" />
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Ranking Individual</h2>
          </div>

          <div className="space-y-3">
            {sortedUsers.slice(0, 10).map((user, index) => {
              const position = index + 1;
              const isCurrentUser = user.id === currentUser.id;

              return (
                <div
                  key={user.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02] ${
                    isCurrentUser
                      ? 'bg-blue-500/20 dark:bg-blue-500/20 light:bg-blue-100/50 border border-blue-500/50 dark:border-blue-500/50 light:border-blue-300 shadow-lg shadow-blue-500/20 dark:shadow-blue-500/20 light:shadow-blue-200/30 animate-fade-in'
                      : 'bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-white/80 border border-transparent hover:border-blue-500/30 dark:hover:border-blue-500/30 light:hover:border-blue-200'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${getMedalColor(
                        position
                      )} flex items-center justify-center font-bold text-white shadow-lg`}
                    >
                      {position <= 3 ? (
                        <Medal className="w-6 h-6" />
                      ) : (
                        <span>{position}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-white dark:text-white light:text-gray-900 font-semibold">{user.name}</p>
                      {isCurrentUser && (
                        <span className="px-2 py-0.5 bg-blue-500 dark:bg-blue-500 light:bg-blue-600 text-white text-xs rounded-full animate-pulse-slow">
                          Tú
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Nivel {user.level}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-white dark:text-white light:text-gray-900 font-bold text-lg">{user.xp.toLocaleString()}</p>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">XP</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-cyan-500/20 dark:border-cyan-500/20 light:border-cyan-200 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center space-x-2 mb-6">
            <Users className="w-6 h-6 text-cyan-400 dark:text-cyan-400 light:text-cyan-600" />
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Ranking de Equipos</h2>
          </div>

          <div className="space-y-3">
            {sortedTeams.map((team, index) => {
              const position = index + 1;
              const isCurrentTeam = team.id === currentUser.teamId;
              const teamMembers = state.users.filter(u => team.memberIds.includes(u.id));

              return (
                <div
                  key={team.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02] ${
                    isCurrentTeam
                      ? 'bg-cyan-500/20 dark:bg-cyan-500/20 light:bg-cyan-100/50 border border-cyan-500/50 dark:border-cyan-500/50 light:border-cyan-300 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/20 light:shadow-cyan-200/30 animate-fade-in'
                      : 'bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-white/80 border border-transparent hover:border-cyan-500/30 dark:hover:border-cyan-500/30 light:hover:border-cyan-200'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${getMedalColor(
                      position
                    )} flex items-center justify-center font-bold text-white shadow-lg`}
                  >
                    {position <= 3 ? (
                      <Medal className="w-6 h-6" />
                    ) : (
                      <span>{position}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-white dark:text-white light:text-gray-900 font-semibold">{team.name}</p>
                      {isCurrentTeam && (
                        <span className="px-2 py-0.5 bg-cyan-500 dark:bg-cyan-500 light:bg-cyan-600 text-white text-xs rounded-full animate-pulse-slow">
                          Tu Equipo
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">{teamMembers.length} miembros</p>
                  </div>

                  <div className="text-right">
                    <p className="text-white dark:text-white light:text-gray-900 font-bold text-lg">{team.xpTotal.toLocaleString()}</p>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">XP Total</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-cyan-100/50 border border-cyan-500/30 dark:border-cyan-500/30 light:border-cyan-200 rounded-xl">
            <p className="text-cyan-400 dark:text-cyan-400 light:text-cyan-700 text-sm text-center">
              Los equipos ganan XP colaborativo completando misiones grupales
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-yellow-500/20 dark:border-yellow-500/20 light:border-yellow-200 animate-fade-in">
        <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-4">Sistema de Puntuación</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-blue-500/20 dark:bg-blue-500/20 light:bg-blue-100 rounded-lg">
                <Trophy className="w-4 h-4 text-blue-400 dark:text-blue-400 light:text-blue-600" />
              </div>
              <h4 className="text-white dark:text-white light:text-gray-900 font-semibold">Tareas Completadas</h4>
            </div>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Gana XP base según dificultad</p>
          </div>
          <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-green-500/20 dark:bg-green-500/20 light:bg-green-100 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-400 dark:text-green-400 light:text-green-600" />
              </div>
              <h4 className="text-white dark:text-white light:text-gray-900 font-semibold">Bonos por Velocidad</h4>
            </div>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">XP extra por completar rápido</p>
          </div>
          <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-purple-500/20 dark:bg-purple-500/20 light:bg-purple-100 rounded-lg">
                <Users className="w-4 h-4 text-purple-400 dark:text-purple-400 light:text-purple-600" />
              </div>
              <h4 className="text-white dark:text-white light:text-gray-900 font-semibold">XP de Equipo</h4>
            </div>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Suma del XP de todos los miembros</p>
          </div>
        </div>
      </div>
    </div>
  );
}
