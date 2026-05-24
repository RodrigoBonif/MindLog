import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { getStoredUser, logout as authLogout } from './services/auth';

function App() {
  const [user, setUser] = useState(() => getStoredUser());

  const handleLogin = (u) => setUser(u);

  const handleLogout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user
            ? <Dashboard user={user} onLogout={handleLogout} onUserUpdate={setUser} />
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
