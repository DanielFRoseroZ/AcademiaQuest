import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Missions from './pages/Missions';
import Challenges from './pages/Challenges';
import Ranking from './pages/Ranking';
import Teams from './pages/Teams';
import Profile from './pages/Profile';
import Rules from './pages/Rules';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useApp();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="missions" element={<Missions />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="teams" element={<Teams />} />
        <Route path="profile" element={<Profile />} />
        <Route path="rules" element={<Rules />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
