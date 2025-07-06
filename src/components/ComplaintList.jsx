import React from 'react';

function ComplaintList({ complaints }) {
  return (
    <div className="complaint-list">
      <h3>📜 Submitted Complaints</h3>
      {complaints.length === 0 && <p>No complaints yet!</p>}
      <ul>
        {complaints.map((c, idx) => (
          <li key={idx}>
            <strong>{c.anonymous ? "Anonymous" : "Student"}:</strong> {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComplaintList;
