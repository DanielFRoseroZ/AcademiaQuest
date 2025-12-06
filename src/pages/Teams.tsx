import { useState } from 'react';
import { Users, UserPlus, Trophy, Target, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';

export default function Teams() {
  const { currentUser, state, contributeToTeamMission } = useApp();
  const { showSuccess, toasts, removeToast } = useToast();
  const [showInviteModal, setShowInviteModal] = useState(false);

  if (!currentUser) {
    return null;
  }

  const currentTeam = currentUser.teamId
    ? state.teams.find(t => t.id === currentUser.teamId)
    : null;

  const teamMembers = currentTeam
    ? state.users.filter(u => currentTeam.memberIds.includes(u.id))
    : [];

  const groupMissions = currentTeam
    ? state.missions.filter(
        m => m.type === 'team' && m.teamId === currentTeam.id && m.status === 'in_progress'
      )
    : [];

  const handleContribute = (missionId: string, progress: number) => {
    contributeToTeamMission(missionId, progress);
    showSuccess('Contribución Registrada', 'Has contribuido a la misión grupal');
  };

  const inviteCode = currentTeam?.inviteCode || 'N/A';

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-2">Equipos</h1>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Colabora con tus compañeros y alcancen metas juntos</p>
        </div>

        {currentTeam ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-cyan-500/20 dark:border-cyan-500/20 light:border-cyan-200 animate-slide-up">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-cyan-500/20 dark:bg-cyan-500/20 light:bg-cyan-100 rounded-lg">
                      <Users className="w-6 h-6 text-cyan-400 dark:text-cyan-400 light:text-cyan-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">{currentTeam.name}</h2>
                      <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Posición #{currentTeam.position} en el ranking</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="px-4 py-2 bg-cyan-500/20 dark:bg-cyan-500/20 light:bg-cyan-100 hover:bg-cyan-500/30 dark:hover:bg-cyan-500/30 light:hover:bg-cyan-200 text-cyan-400 dark:text-cyan-400 light:text-cyan-700 rounded-lg font-semibold transition-all duration-300 ease-out hover:scale-105 flex items-center space-x-2 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/20 light:shadow-cyan-200/30"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Invitar</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm mb-1">XP Total</p>
                    <p className="text-2xl font-bold text-white dark:text-white light:text-gray-900">{currentTeam.xpTotal.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm mb-1">Miembros</p>
                    <p className="text-2xl font-bold text-white dark:text-white light:text-gray-900">{teamMembers.length}</p>
                  </div>
                  <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm mb-1">Misiones Activas</p>
                    <p className="text-2xl font-bold text-white dark:text-white light:text-gray-900">{groupMissions.length}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white dark:text-white light:text-gray-900 mb-4">Miembros del Equipo</h3>
                  <div className="space-y-3">
                    {teamMembers.map((member, index) => (
                      <div
                        key={member.id}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02] ${
                          member.id === currentUser.id
                            ? 'bg-cyan-500/20 dark:bg-cyan-500/20 light:bg-cyan-100/50 border border-cyan-500/50 dark:border-cyan-500/50 light:border-cyan-300 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/20 light:shadow-cyan-200/30'
                            : 'bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-white/80 border border-transparent hover:border-cyan-500/30 dark:hover:border-cyan-500/30 light:hover:border-cyan-200'
                        } animate-fade-in`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {member.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="text-white dark:text-white light:text-gray-900 font-semibold">{member.name}</p>
                            {member.id === currentUser.id && (
                              <span className="px-2 py-0.5 bg-cyan-500 dark:bg-cyan-500 light:bg-cyan-600 text-white text-xs rounded-full animate-pulse-slow">
                                Tú
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Nivel {member.level}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white dark:text-white light:text-gray-900 font-bold">{member.xp.toLocaleString()}</p>
                          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">XP</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-500/20 dark:border-blue-500/20 light:border-blue-200 animate-slide-up" style={{ animationDelay: '150ms' }}>
                <div className="flex items-center space-x-2 mb-4">
                  <Trophy className="w-6 h-6 text-yellow-400 dark:text-yellow-400 light:text-yellow-600" />
                  <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">Beneficios de Equipo</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-100/50 rounded-lg border border-blue-500/30 dark:border-blue-500/30 light:border-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <p className="text-blue-400 dark:text-blue-400 light:text-blue-700 font-semibold mb-1">XP Compartido</p>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Todos ganan cuando el equipo completa misiones</p>
                  </div>
                  <div className="p-4 bg-green-500/10 dark:bg-green-500/10 light:bg-green-100/50 rounded-lg border border-green-500/30 dark:border-green-500/30 light:border-green-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <p className="text-green-400 dark:text-green-400 light:text-green-700 font-semibold mb-1">Bonos Colaborativos</p>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">XP extra por trabajar juntos</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 dark:bg-purple-500/10 light:bg-purple-100/50 rounded-lg border border-purple-500/30 dark:border-purple-500/30 light:border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <p className="text-purple-400 dark:text-purple-400 light:text-purple-700 font-semibold mb-1">Ranking de Equipos</p>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Compite contra otros equipos</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-green-400 dark:text-green-400 light:text-green-600" />
                <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Misiones Grupales Activas</h2>
              </div>
              {groupMissions.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {groupMissions.map((mission, index) => (
                    <div
                      key={mission.id}
                      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-green-500/20 dark:border-green-500/20 light:border-green-200 hover:border-green-500/50 dark:hover:border-green-500/50 light:hover:border-green-400 transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-xl animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">{mission.title}</h3>
                      {mission.description && (
                        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">{mission.description}</p>
                      )}

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400 dark:text-gray-400 light:text-gray-600">Progreso del Equipo</span>
                          <span className="text-white dark:text-white light:text-gray-900 font-semibold">{mission.progress}%</span>
                        </div>
                        <ProgressBar progress={mission.progress} color="green" height="md" />
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-700 dark:border-slate-700 light:border-gray-200">
                        <div className="space-y-1">
                          {mission.contributions && (
                            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
                              {mission.contributions.length} miembros contribuyendo
                            </p>
                          )}
                          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
                            Tiempo restante: {Math.ceil((new Date(mission.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} días
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-400 dark:text-green-400 light:text-green-600">+{mission.rewardXp}</p>
                          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">XP por miembro</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleContribute(mission.id, 10)}
                        className="w-full mt-4 py-2 bg-green-500/20 dark:bg-green-500/20 light:bg-green-100 hover:bg-green-500/30 dark:hover:bg-green-500/30 light:hover:bg-green-200 text-green-400 dark:text-green-400 light:text-green-700 rounded-lg font-semibold transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg"
                      >
                        Contribuir (+10%)
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-800/50 rounded-xl p-8 text-center">
                  <p className="text-gray-400">No hay misiones grupales activas</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 dark:border-cyan-500/20 light:border-cyan-200 text-center animate-fade-in">
            <Users className="w-16 h-16 text-cyan-400 dark:text-cyan-400 light:text-cyan-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-2">No estás en un equipo</h2>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-6">Únete a un equipo para participar en misiones colaborativas</p>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl shadow-lg shadow-cyan-500/30 dark:shadow-cyan-500/30 light:shadow-cyan-200/30">
              Buscar Equipos
            </button>
          </div>
        )}

        {showInviteModal && currentTeam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 light:from-white light:to-blue-50 rounded-2xl border border-cyan-500/20 dark:border-cyan-500/20 light:border-cyan-200 shadow-2xl max-w-md w-full p-6 animate-slide-up">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Invitar a Equipo</h2>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="p-2 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-gray-200 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5 text-gray-400 dark:text-gray-400 light:text-gray-600" />
                </button>
              </div>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-4">
                Comparte este código con tus compañeros para que se unan a tu equipo:
              </p>
              <div className="bg-slate-700/50 dark:bg-slate-700/50 light:bg-blue-100/50 rounded-lg p-4 mb-4 border border-cyan-500/30 dark:border-cyan-500/30 light:border-cyan-200">
                <p className="text-2xl font-bold text-cyan-400 dark:text-cyan-400 light:text-cyan-700 text-center font-mono">{inviteCode}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(inviteCode);
                  showSuccess('Código Copiado', 'El código de invitación ha sido copiado');
                }}
                className="w-full py-2 bg-cyan-500/20 dark:bg-cyan-500/20 light:bg-cyan-100 hover:bg-cyan-500/30 dark:hover:bg-cyan-500/30 light:hover:bg-cyan-200 text-cyan-400 dark:text-cyan-400 light:text-cyan-700 rounded-lg font-semibold transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg"
              >
                Copiar Código
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Cómo Funcionan los Equipos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="text-white font-semibold">Forma tu Equipo</p>
                <p className="text-gray-300 text-sm">Invita hasta 6 compañeros para colaborar</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="text-white font-semibold">Misiones Compartidas</p>
                <p className="text-gray-300 text-sm">Completen proyectos juntos para ganar XP</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="text-white font-semibold">Progreso Colectivo</p>
                <p className="text-gray-300 text-sm">Cada contribución suma al objetivo común</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <p className="text-white font-semibold">Recompensas Grupales</p>
                <p className="text-gray-300 text-sm">Todos ganan XP al completar misiones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
