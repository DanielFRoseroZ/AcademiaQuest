import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Trophy } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Por favor ingresa tu email o nickname');
      return;
    }

    // Buscar usuario por email o nombre
    const user = state.users.find(
      u => u.email?.toLowerCase() === email.toLowerCase() || 
           u.name.toLowerCase() === email.toLowerCase()
    );

    if (user) {
      dispatch({ type: 'SET_CURRENT_USER', payload: user.id });
      navigate('/dashboard');
    } else {
      // Crear usuario nuevo si no existe
      const newUser = {
        id: `u_${Date.now()}`,
        name: email.split('@')[0] || email,
        avatar: email.substring(0, 2).toUpperCase(),
        level: 1,
        xp: 0,
        streak: 0,
        teamId: null,
        badges: [],
        email: email.includes('@') ? email : undefined,
        joinDate: new Date().toISOString(),
      };

      // Agregar a usuarios
      const updatedUsers = [...state.users, newUser];
      dispatch({ type: 'INIT_DATA', payload: { users: updatedUsers } });
      dispatch({ type: 'SET_CURRENT_USER', payload: newUser.id });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 light:from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 dark:from-slate-800/80 dark:to-slate-900/80 light:from-white/90 light:to-blue-50/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-blue-500/20 dark:border-blue-500/20 light:border-blue-200 shadow-2xl animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-3">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-2">AcademiaQuest</h1>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Inicia sesión para comenzar tu aventura</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
              Email o Nickname
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="miguel@example.com o miguel"
              className="w-full px-4 py-3 bg-slate-700/50 dark:bg-slate-700/50 light:bg-white border border-slate-600 dark:border-slate-600 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 light:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 light:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-500/20 dark:bg-red-500/20 light:bg-red-100/50 border border-red-500/50 dark:border-red-500/50 light:border-red-300 text-red-400 dark:text-red-400 light:text-red-700 px-4 py-3 rounded-lg text-sm animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all duration-300 ease-out shadow-lg shadow-blue-500/30 dark:shadow-blue-500/30 light:shadow-blue-200/30 hover:shadow-xl hover:scale-105"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm mb-3">Usuarios de prueba:</p>
          <div className="space-y-2">
            {state.users.slice(0, 3).map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  setEmail(user.email || user.name);
                }}
                className="block w-full text-left px-4 py-2 bg-slate-700/30 dark:bg-slate-700/30 light:bg-blue-100/50 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-blue-200/70 rounded-lg text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm transition-all duration-300 ease-out hover:scale-[1.02]"
              >
                {user.name} ({user.email || 'Sin email'})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

