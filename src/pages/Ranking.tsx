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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Ranking</h1>
        <p className="text-gray-400">Compite con otros estudiantes y equipos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
          <div className="flex items-center space-x-2 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Ranking Individual</h2>
          </div>

          <div className="space-y-3">
            {sortedUsers.slice(0, 10).map((user, index) => {
              const position = index + 1;
              const isCurrentUser = user.id === currentUser.id;

              return (
                <div
                  key={user.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                    isCurrentUser
                      ? 'bg-blue-500/20 border border-blue-500/50 shadow-lg shadow-blue-500/20'
                      : 'bg-slate-700/30 hover:bg-slate-700/50'
                  }`}
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
                      <p className="text-white font-semibold">{user.name}</p>
                      {isCurrentUser && (
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                          Tú
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">Nivel {user.level}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{user.xp.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs">XP</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Ranking de Equipos</h2>
          </div>

          <div className="space-y-3">
            {sortedTeams.map((team, index) => {
              const position = index + 1;
              const isCurrentTeam = team.id === currentUser.teamId;
              const teamMembers = state.users.filter(u => team.memberIds.includes(u.id));

              return (
                <div
                  key={team.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                    isCurrentTeam
                      ? 'bg-cyan-500/20 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-700/30 hover:bg-slate-700/50'
                  }`}
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
                      <p className="text-white font-semibold">{team.name}</p>
                      {isCurrentTeam && (
                        <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full">
                          Tu Equipo
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{teamMembers.length} miembros</p>
                  </div>

                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{team.xpTotal.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs">XP Total</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
            <p className="text-cyan-400 text-sm text-center">
              Los equipos ganan XP colaborativo completando misiones grupales
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
        <h3 className="text-xl font-bold text-white mb-4">Sistema de Puntuación</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Trophy className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="text-white font-semibold">Tareas Completadas</h4>
            </div>
            <p className="text-gray-400 text-sm">Gana XP base según dificultad</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <h4 className="text-white font-semibold">Bonos por Velocidad</h4>
            </div>
            <p className="text-gray-400 text-sm">XP extra por completar rápido</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold">XP de Equipo</h4>
            </div>
            <p className="text-gray-400 text-sm">Suma del XP de todos los miembros</p>
          </div>
        </div>
      </div>
    </div>
  );
}
