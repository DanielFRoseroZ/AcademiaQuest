import { Trophy, Target, Zap, Users, User, BookOpen, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onNotificationsClick: () => void;
}

export default function Navigation({ currentPage, onNavigate, onNotificationsClick }: NavigationProps) {
  const navigate = useNavigate();
  const { currentUser, logout } = useApp();

  const navItems = [
    { id: 'dashboard', icon: Target, label: 'Dashboard' },
    { id: 'missions', icon: BookOpen, label: 'Misiones' },
    { id: 'challenges', icon: Zap, label: 'Desafíos' },
    { id: 'ranking', icon: Trophy, label: 'Ranking' },
    { id: 'teams', icon: Users, label: 'Equipos' },
    { id: 'profile', icon: User, label: 'Perfil' },
    { id: 'rules', icon: BookOpen, label: 'Reglas' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AcademiaQuest</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            {currentUser && (
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800/50">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {currentUser.avatar}
                </div>
                <span className="text-sm text-gray-300">{currentUser.name}</span>
              </div>
            )}
            <button
              onClick={onNotificationsClick}
              className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-slate-800 hover:bg-red-600/20 hover:border-red-500/50 border border-transparent transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5 text-gray-300 hover:text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
