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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Equipos</h1>
          <p className="text-gray-400">Colabora con tus compañeros y alcancen metas juntos</p>
        </div>

        {currentTeam ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-cyan-500/20 rounded-lg">
                      <Users className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{currentTeam.name}</h2>
                      <p className="text-gray-400">Posición #{currentTeam.position} en el ranking</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Invitar</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">XP Total</p>
                    <p className="text-2xl font-bold text-white">{currentTeam.xpTotal.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Miembros</p>
                    <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Misiones Activas</p>
                    <p className="text-2xl font-bold text-white">{groupMissions.length}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Miembros del Equipo</h3>
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-colors ${
                          member.id === currentUser.id
                            ? 'bg-cyan-500/20 border border-cyan-500/50'
                            : 'bg-slate-700/30'
                        }`}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {member.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="text-white font-semibold">{member.name}</p>
                            {member.id === currentUser.id && (
                              <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full">
                                Tú
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">Nivel {member.level}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{member.xp.toLocaleString()}</p>
                          <p className="text-gray-400 text-xs">XP</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                <div className="flex items-center space-x-2 mb-4">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Beneficios de Equipo</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <p className="text-blue-400 font-semibold mb-1">XP Compartido</p>
                    <p className="text-gray-300 text-sm">Todos ganan cuando el equipo completa misiones</p>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <p className="text-green-400 font-semibold mb-1">Bonos Colaborativos</p>
                    <p className="text-gray-300 text-sm">XP extra por trabajar juntos</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <p className="text-purple-400 font-semibold mb-1">Ranking de Equipos</p>
                    <p className="text-gray-300 text-sm">Compite contra otros equipos</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Misiones Grupales Activas</h2>
              </div>
              {groupMissions.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {groupMissions.map((mission) => (
                    <div
                      key={mission.id}
                      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-200"
                    >
                      <h3 className="text-xl font-bold text-white mb-2">{mission.title}</h3>
                      {mission.description && (
                        <p className="text-gray-400 mb-4">{mission.description}</p>
                      )}

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progreso del Equipo</span>
                          <span className="text-white font-semibold">{mission.progress}%</span>
                        </div>
                        <ProgressBar progress={mission.progress} color="green" height="md" />
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                        <div className="space-y-1">
                          {mission.contributions && (
                            <p className="text-gray-400 text-sm">
                              {mission.contributions.length} miembros contribuyendo
                            </p>
                          )}
                          <p className="text-gray-400 text-sm">
                            Tiempo restante: {Math.ceil((new Date(mission.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} días
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-400">+{mission.rewardXp}</p>
                          <p className="text-gray-400 text-xs">XP por miembro</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleContribute(mission.id, 10)}
                        className="w-full mt-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-semibold transition-colors"
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
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 text-center">
            <Users className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No estás en un equipo</h2>
            <p className="text-gray-400 mb-6">Únete a un equipo para participar en misiones colaborativas</p>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all">
              Buscar Equipos
            </button>
          </div>
        )}

        {showInviteModal && currentTeam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-cyan-500/20 shadow-2xl max-w-md w-full p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Invitar a Equipo</h2>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p className="text-gray-300 mb-4">
                Comparte este código con tus compañeros para que se unan a tu equipo:
              </p>
              <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                <p className="text-2xl font-bold text-cyan-400 text-center font-mono">{inviteCode}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(inviteCode);
                  showSuccess('Código Copiado', 'El código de invitación ha sido copiado');
                }}
                className="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg font-semibold transition-colors"
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
