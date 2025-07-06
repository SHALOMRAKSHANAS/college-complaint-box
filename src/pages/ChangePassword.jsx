// ChangePassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function ChangePassword() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const getAdminPassword = () => localStorage.getItem('adminPassword') || 'admin';
  const setAdminPassword = (pass) => localStorage.setItem('adminPassword', pass);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (oldPassword !== getAdminPassword()) {
      setMessage('❌ Old password is incorrect.');
    } else if (newPassword !== confirmPassword) {
      setMessage('❌ New passwords do not match.');
    } else {
      setAdminPassword(newPassword);
      setMessage('✅ Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="admin-wrapper">
      <h2 className="admin-title">🔐 Change Password</h2>
      <div className="password-form">
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="button-primary">Save Password</button>
          <button
            type="button"
            className="button-secondary"
            onClick={() => navigate(-1)}
          >
            🔙 Back
          </button>
        </form>
        {message && <p className="password-message">{message}</p>}
      </div>
    </div>
  );
}

export default ChangePassword;
