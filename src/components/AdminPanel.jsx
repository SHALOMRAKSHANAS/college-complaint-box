import React from 'react';
import ComplaintList from './ComplaintList';

function AdminPanel({ complaints }) {
  return (
    <div className="admin-panel">
      <h2>👨‍💻 Admin Panel</h2>
      <ComplaintList complaints={complaints} />
    </div>
  );
}

export default AdminPanel;
