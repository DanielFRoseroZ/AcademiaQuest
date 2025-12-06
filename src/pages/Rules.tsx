import { BookOpen, Zap, Trophy, Users, Star, Target } from 'lucide-react';

export default function Rules() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-2">Reglas del Juego</h1>
        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Aprende cómo funciona la plataforma y cómo ganar XP</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-500/20 dark:border-blue-500/20 light:border-blue-200 animate-slide-up">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-500/20 dark:bg-blue-500/20 light:bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-400 dark:text-blue-400 light:text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Sistema de Niveles y XP</h2>
          </div>
          <div className="space-y-4 text-gray-300 dark:text-gray-300 light:text-gray-700">
            <p>
              El sistema de experiencia (XP) es la base de tu progreso. Cada actividad completada te otorga XP que te permite subir de nivel y desbloquear nuevos rangos.
            </p>
            <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-white dark:text-white light:text-gray-900 font-semibold mb-2">Cómo Ganar XP:</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-blue-400 dark:text-blue-400 light:text-blue-600 mr-2">•</span>
                  <span className="text-gray-300 dark:text-gray-300 light:text-gray-700"><strong>Tareas Básicas:</strong> 100-150 XP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Tareas Intermedias:</strong> 200-300 XP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Tareas Avanzadas:</strong> 400-500 XP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Desafíos Semanales:</strong> Bono de 500 XP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Misiones Grupales:</strong> 250-400 XP por miembro</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20 dark:border-purple-500/20 light:border-purple-200 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-500/20 dark:bg-purple-500/20 light:bg-purple-100 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-400 dark:text-purple-400 light:text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Rangos y Progresión</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 dark:from-gray-500/20 dark:to-gray-600/20 light:from-gray-100/50 light:to-gray-200/50 border border-gray-500/30 dark:border-gray-500/30 light:border-gray-300 rounded-lg p-4 transition-all duration-300 hover:scale-105">
              <h3 className="text-white dark:text-white light:text-gray-900 font-bold mb-2">Explorador (Nivel 1-4)</h3>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Tu viaje comienza aquí. Aprende lo básico y familiarízate con la plataforma.</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 dark:from-green-500/20 dark:to-emerald-600/20 light:from-green-100/50 light:to-emerald-100/50 border border-green-500/30 dark:border-green-500/30 light:border-green-300 rounded-lg p-4 transition-all duration-300 hover:scale-105">
              <h3 className="text-white dark:text-white light:text-gray-900 font-bold mb-2">Aprendiz Activo (Nivel 5-9)</h3>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Participas regularmente y completas misiones con consistencia.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 dark:from-blue-500/20 dark:to-cyan-600/20 light:from-blue-100/50 light:to-cyan-100/50 border border-blue-500/30 dark:border-blue-500/30 light:border-blue-300 rounded-lg p-4 transition-all duration-300 hover:scale-105">
              <h3 className="text-white dark:text-white light:text-gray-900 font-bold mb-2">Retador (Nivel 10-19)</h3>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Dominas desafíos difíciles y colaboras efectivamente en equipos.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 dark:from-purple-500/20 dark:to-pink-600/20 light:from-purple-100/50 light:to-pink-100/50 border border-purple-500/30 dark:border-purple-500/30 light:border-purple-300 rounded-lg p-4 transition-all duration-300 hover:scale-105">
              <h3 className="text-white dark:text-white light:text-gray-900 font-bold mb-2">Maestro del Conocimiento (Nivel 20+)</h3>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Líder académico que inspira y ayuda a otros estudiantes.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-500/20 dark:border-green-500/20 light:border-green-200 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-500/20 dark:bg-green-500/20 light:bg-green-100 rounded-lg">
              <Zap className="w-6 h-6 text-green-400 dark:text-green-400 light:text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Tipos de Misiones</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-white dark:text-white light:text-gray-900 font-semibold mb-2 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-400 dark:text-blue-400 light:text-blue-600" />
                Tareas Individuales
              </h3>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">
                Actividades académicas personales con diferentes niveles de dificultad. Completa antes de la fecha límite para obtener el XP completo.
              </p>
            </div>
            <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-white dark:text-white light:text-gray-900 font-semibold mb-2 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-purple-400 dark:text-purple-400 light:text-purple-600" />
                Retos y Desafíos
              </h3>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">
                Actividades cronometradas que requieren velocidad y precisión. Completa antes del tiempo límite para bonos extra.
              </p>
            </div>
            <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-white dark:text-white light:text-gray-900 font-semibold mb-2 flex items-center">
                <Users className="w-5 h-5 mr-2 text-cyan-400 dark:text-cyan-400 light:text-cyan-600" />
                Proyectos Colaborativos
              </h3>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">
                Misiones grupales donde el progreso es compartido. Todos los miembros del equipo reciben XP al completar.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-yellow-500/20 dark:border-yellow-500/20 light:border-yellow-200 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-yellow-500/20 dark:bg-yellow-500/20 light:bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-400 dark:text-yellow-400 light:text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Insignias y Logros</h2>
          </div>
          <div className="text-gray-300 dark:text-gray-300 light:text-gray-700 space-y-3">
            <p>
              Las insignias son reconocimientos especiales por alcanzar hitos importantes. Algunas se obtienen automáticamente, otras requieren esfuerzo constante.
            </p>
            <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-white dark:text-white light:text-gray-900 font-semibold mb-3">Ejemplos de Insignias:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start space-x-2">
                  <span className="text-yellow-400 dark:text-yellow-400 light:text-yellow-600">🔥</span>
                  <div>
                    <p className="text-white dark:text-white light:text-gray-900 font-medium">Racha de 7 días</p>
                    <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">Completa actividades durante 7 días consecutivos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-yellow-400 dark:text-yellow-400 light:text-yellow-600">🏆</span>
                  <div>
                    <p className="text-white dark:text-white light:text-gray-900 font-medium">Top 10</p>
                    <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">Alcanza el top 10 del ranking semanal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-yellow-400 dark:text-yellow-400 light:text-yellow-600">⭐</span>
                  <div>
                    <p className="text-white dark:text-white light:text-gray-900 font-medium">50 Misiones</p>
                    <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">Completa 50 misiones en total</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-yellow-400 dark:text-yellow-400 light:text-yellow-600">🤝</span>
                  <div>
                    <p className="text-white dark:text-white light:text-gray-900 font-medium">Colaborador Activo</p>
                    <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">Participa en 10 proyectos grupales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-cyan-500/20 dark:border-cyan-500/20 light:border-cyan-200 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-cyan-500/20 dark:bg-cyan-500/20 light:bg-cyan-100 rounded-lg">
              <Users className="w-6 h-6 text-cyan-400 dark:text-cyan-400 light:text-cyan-600" />
            </div>
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Sistema de Equipos</h2>
          </div>
          <div className="text-gray-300 dark:text-gray-300 light:text-gray-700 space-y-3">
            <p>
              Los equipos permiten colaborar con otros estudiantes y ganar XP juntos. El XP del equipo es la suma del XP de todos sus miembros.
            </p>
            <div className="bg-slate-700/30 dark:bg-slate-700/30 light:bg-white/60 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-white dark:text-white light:text-gray-900 font-semibold mb-2">Beneficios de Trabajar en Equipo:</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-cyan-400 dark:text-cyan-400 light:text-cyan-700 mr-2">•</span>
                  <span>XP compartido en misiones grupales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 dark:text-cyan-400 light:text-cyan-700 mr-2">•</span>
                  <span>Bonos adicionales por colaboración efectiva</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 dark:text-cyan-400 light:text-cyan-700 mr-2">•</span>
                  <span>Acceso a proyectos exclusivos de equipo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 dark:text-cyan-400 light:text-cyan-700 mr-2">•</span>
                  <span>Competencia en el ranking de equipos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
