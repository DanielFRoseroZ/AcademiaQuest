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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AcademiaQuest</h1>
          <p className="text-gray-400">Inicia sesión para comenzar tu aventura</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email o Nickname
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="miguel@example.com o miguel"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-3">Usuarios de prueba:</p>
          <div className="space-y-2">
            {state.users.slice(0, 3).map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  setEmail(user.email || user.name);
                }}
                className="block w-full text-left px-4 py-2 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg text-gray-300 text-sm transition-colors"
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

