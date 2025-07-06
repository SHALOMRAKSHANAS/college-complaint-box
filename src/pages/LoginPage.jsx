import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminPassword, setAdminSession } from '../utils/storage';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin123@gmail.com' && password === getAdminPassword()) {
      setAdminSession(true);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials ❌');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
      <h2 className="login-heading"><span role="img" aria-label="lock">🔐</span> Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">Login</button>
        {error && <p className="login-error">{error}</p>}
        <div className="login-link">
          <p>📝 <a href="/complaint">Click here to file a complaint anonymously</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
