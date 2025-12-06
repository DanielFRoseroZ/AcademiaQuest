import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Notifications from '../pages/Notifications';

export default function Layout() {
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname.slice(1) || 'dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 light:from-blue-50 light:via-indigo-50 light:to-purple-50 transition-colors duration-300">
      <Navigation
        currentPage={currentPage}
        onNavigate={(page) => navigate(`/${page}`)}
        onNotificationsClick={() => setShowNotifications(!showNotifications)}
      />
      {showNotifications && (
        <Notifications onClose={() => setShowNotifications(false)} />
      )}
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}

