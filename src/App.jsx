import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import Login from './pages/Login.jsx';
import Rounds from './pages/Rounds.jsx';
import Rules from './pages/Rules.jsx';
import RoundPlay from './pages/RoundPlay.jsx';

function RequireAuth({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/rounds" element={<RequireAuth><Rounds /></RequireAuth>} />
      <Route path="/rules/:round" element={<RequireAuth><Rules /></RequireAuth>} />
      <Route path="/round/:round" element={<RequireAuth><RoundPlay /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
