import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Dashboard } from './pages/Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ml_current_user')); }
    catch { return null; }
  });

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => {
    localStorage.removeItem('ml_current_user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user
            ? <Dashboard user={user} onLogout={handleLogout} />
            : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
