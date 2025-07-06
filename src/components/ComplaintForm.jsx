import React, { useState } from 'react';
import '../styles/Form.css';

function ComplaintForm({ onSubmit }) {
  const [complaint, setComplaint] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaint.trim()) return;
    onSubmit({ text: complaint, anonymous: isAnonymous });
    setComplaint('');
  };

  return (
    <form className="complaint-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter your complaint or suggestion..."
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
        required
      ></textarea>

      <label>
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={() => setIsAnonymous(!isAnonymous)}
        />
        Submit as Anonymous
      </label>

      <button type="submit" className="button-primary">Submit</button>
    </form>
  );
}

export default ComplaintForm;
