import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ComplaintForm.css';

function ComplaintForm() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // ✅ Add your inappropriate words list (English and Tamil)
  const bannedWords = [
    'idiot', 'stupid', 'nonsense',
    'fuck', 'shit', 'bitch',
    'முட்டாள்', 'வேசி', 'புண்', 'பகை', 'சட்டப்பொடி', 'சேட்ட', 'கூத்தாடி'
  ];

  // ✅ Check if complaint has bad words
  const containsBadWords = (text) => {
    return bannedWords.some(word =>
      text.toLowerCase().includes(word)
    );
  };

  const handleSubmit = () => {
    setErrorMsg('');

    if (!text.trim() || !category) {
      setErrorMsg('⚠️ Please fill in all fields.');
      return;
    }

    if (containsBadWords(text)) {
      setErrorMsg('❌ Your complaint contains inappropriate language. Please remove it.');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('complaints') || '[]');

    const newComplaint = {
      id: Date.now(),
      text,
      category,
      timestamp: new Date().toISOString(),
      starred: false,
    };

    existing.push(newComplaint);
    localStorage.setItem('complaints', JSON.stringify(existing));

    alert('✅ Your complaint was submitted anonymously!');
    navigate('/');
  };

  return (
    <div className="complaint-wrapper">
      <h2>📝 File an Anonymous Complaint</h2>

      {errorMsg && <div className="error-message">{errorMsg}</div>}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your complaint here..."
        rows={6}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Hostel">Hostel</option>
        <option value="WiFi">WiFi</option>
        <option value="Food">Food</option>
        <option value="Academics">Academics</option>
        <option value="Other">Other</option>
      </select>

      <button onClick={handleSubmit}>Submit Complaint</button>
    </div>
  );
}

export default ComplaintForm;
