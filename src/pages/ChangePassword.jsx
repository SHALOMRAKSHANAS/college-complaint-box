import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Theme.css';

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
    <div className="glass-card">
      <h2>🔐 Change Password</h2>
      <form className="password-form" onSubmit={handleSubmit}>
        <input
          className="glass-input"
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          className="glass-input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          className="glass-input"
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="glass-button">Save Password</button>
        <button
          type="button"
          className="glass-button"
          onClick={() => navigate(-1)}
        >
          🔙 Back
        </button>
      </form>
      {message && <p className="password-message">{message}</p>}
    </div>
  );
}

export default ChangePassword;
