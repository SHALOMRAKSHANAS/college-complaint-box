import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import ComplaintForm from './pages/ComplaintForm';
import AdminDashboard from './pages/AdminDashboard';
import ChangePassword from './pages/ChangePassword';  // ✅ ADD THIS
import { getDarkMode, setDarkMode } from './utils/storage';

function App() {
  const [darkMode, setDark] = useState(getDarkMode());

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDark(!darkMode);
    setDarkMode(!darkMode);
  };

  return (
    <>
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          zIndex: 999,
          padding: '8px 12px'
        }}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/change-password" element={<ChangePassword />} />  {/* ✅ ADDED ROUTE */}
      </Routes>
    </>
  );
}

export default App;
