import { X, Trophy, Zap, Users, Star, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NotificationsProps {
  onClose: () => void;
}

export default function Notifications({ onClose }: NotificationsProps) {
  const { currentUser, state, dispatch } = useApp();

  if (!currentUser) {
    return null;
  }

  const notifications = state.notifications
    .filter(n => n.userId === currentUser.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach(n => {
      if (!n.read) {
        dispatch({ type: 'MARK_NOTIFICATION_READ', payload: n.id });
      }
    });
  };

  const colorMap = {
    yellow: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30',
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    cyan: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    green: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  };

  const iconColorMap = {
    yellow: 'text-yellow-400',
    blue: 'text-blue-400',
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'yellow';
      case 'xp':
        return 'blue';
      case 'team':
        return 'cyan';
      case 'level':
        return 'purple';
      case 'mission':
      case 'challenge':
        return 'green';
      default:
        return 'blue';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return Trophy;
      case 'xp':
        return Zap;
      case 'team':
        return Users;
      case 'level':
        return Star;
      case 'mission':
      case 'challenge':
        return CheckCircle2;
      default:
        return Star;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Hace un momento';
    if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (days < 7) return `Hace ${days} día${days > 1 ? 's' : ''}`;
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-20 pr-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-900/98 dark:bg-slate-900/98 light:bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-500/30 dark:border-blue-500/30 light:border-blue-200 overflow-hidden animate-slide-up">
          <div className="flex items-center justify-between p-4 border-b border-slate-700 dark:border-slate-700 light:border-gray-200">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white dark:text-white light:text-gray-900">Notificaciones</h2>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-blue-500 dark:bg-blue-500 light:bg-blue-600 text-white text-xs rounded-full font-semibold animate-pulse-slow">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-200 rounded-lg transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-400 dark:text-gray-400 light:text-gray-600" />
            </button>
          </div>

          <div className="max-h-[600px] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="p-4 space-y-3">
                {notifications.map((notification, index) => {
                  const color = getNotificationColor(notification.type);
                  const Icon = getNotificationIcon(notification.type);

                  return (
                    <div
                      key={notification.id}
                      onClick={() => handleMarkAsRead(notification.id)}
                      className={`relative bg-gradient-to-br ${
                        colorMap[color as keyof typeof colorMap]
                      } border rounded-xl p-4 transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.02] cursor-pointer transform ${
                        !notification.read ? 'border-opacity-100' : 'border-opacity-30'
                      } animate-fade-in`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {!notification.read && (
                        <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            colorMap[color as keyof typeof colorMap]
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              iconColorMap[color as keyof typeof iconColorMap]
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white dark:text-white light:text-gray-900 font-semibold mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm mb-2">
                            {notification.message}
                          </p>
                          <p className="text-gray-500 dark:text-gray-500 light:text-gray-500 text-xs">{formatTime(notification.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">No tienes notificaciones</p>
              </div>
            )}
          </div>

          {notifications.length > 0 && unreadCount > 0 && (
            <div className="p-4 border-t border-slate-700 dark:border-slate-700 light:border-gray-200">
              <button
                onClick={handleMarkAllAsRead}
                className="w-full py-2 text-center text-blue-400 dark:text-blue-400 light:text-blue-600 hover:text-blue-300 dark:hover:text-blue-300 light:hover:text-blue-700 text-sm font-medium transition-all duration-300 ease-out hover:scale-105"
              >
                Marcar todas como leídas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
