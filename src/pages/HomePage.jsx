import React, { useState } from 'react';
import ComplaintForm from '../components/ComplaintForm';
import ComplaintList from '../components/ComplaintList';

function HomePage() {
  const [complaints, setComplaints] = useState([]);

  const handleNewComplaint = (data) => {
    setComplaints([...complaints, data]);
  };

  return (
    <div className="page">
      <h2>📢 Submit Your Complaint or Suggestion</h2>
      <ComplaintForm onSubmit={handleNewComplaint} />
      <ComplaintList complaints={complaints} />
    </div>
  );
}

export default HomePage;
