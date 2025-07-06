// AdminDashboard.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(stored);
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const notify = (message) => {
    toast.success(message);
    playSound();
  };

  const handleClearComplaints = () => {
    if (window.confirm('Are you sure you want to clear all complaints?')) {
      localStorage.removeItem('complaints');
      setComplaints([]);
      notify('All complaints cleared!');
    }
  };

  const toggleStar = (id) => {
    const updated = complaints.map(c =>
      c.id === id ? { ...c, starred: !c.starred } : c
    );
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
    notify('Star status updated!');
  };

  const handleDeleteComplaint = (id) => {
    if (window.confirm('Delete this complaint?')) {
      const updated = complaints.filter(c => c.id !== id);
      setComplaints(updated);
      localStorage.setItem('complaints', JSON.stringify(updated));
      notify('Complaint deleted!');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = complaints.map(c =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
    notify(`Status changed to ${newStatus}`);
  };

  const handleDownloadPDF = () => {
    if (filteredComplaints.length === 0) {
      alert('No complaints to download.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('📋 College Complaints Report', 20, 20);

    let y = 40;
    filteredComplaints.forEach((c, idx) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(12);
      doc.text(`Complaint #${idx + 1}`, 20, y);
      y += 8;
      doc.text(`Text: ${c.text}`, 20, y);
      y += 8;
      doc.text(`Category: ${c.category || 'N/A'}`, 20, y);
      y += 8;
      doc.text(`Status: ${c.status || 'Open'}`, 20, y);
      y += 8;
      doc.text(`Timestamp: ${new Date(c.timestamp).toLocaleString()}`, 20, y);
      y += 8;
      doc.text(`Starred: ${c.starred ? 'Yes ⭐' : 'No'}`, 20, y);
      y += 12;
    });

    doc.save('complaints_report.pdf');
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesText = c.text.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !filterCategory || c.category === filterCategory;
    const matchesStatus = !filterStatus || c.status === filterStatus;
    const matchesStarred = !showStarredOnly || c.starred;
    return matchesText && matchesCategory && matchesStatus && matchesStarred;
  });

  // Chart Data
  const categoryCounts = complaints.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryCounts).map(([name, count]) => ({ name, count }));

  const dateCounts = complaints.reduce((acc, curr) => {
    const date = new Date(curr.timestamp).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const dateData = Object.entries(dateCounts).map(([date, count]) => ({ date, count }));

  const starredData = [
    { name: 'Starred', value: complaints.filter(c => c.starred).length },
    { name: 'Unstarred', value: complaints.filter(c => !c.starred).length },
  ];

  const COLORS = ['#FFD700', '#8884d8'];

  return (
    <div className="admin-wrapper">
      <audio ref={audioRef} src="/notify.mp3" preload="auto" />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <h2 className="admin-title">📋 Admin Dashboard</h2>

      <div className="admin-top-buttons">
        <button className="button-secondary" onClick={() => navigate('/change-password')}>
          🔐 Change Password
        </button>
        <button className="button-secondary" onClick={() => navigate('/')}>
          🔙 Logout
        </button>
      </div>

      <div className="admin-buttons">
        <button className="button-primary" onClick={handleClearComplaints}>
          🗑️ Clear All Complaints
        </button>
        <button className="button-primary" onClick={handleDownloadPDF}>
          📥 Download PDF
        </button>
      </div>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="🔎 Search text..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Hostel">Hostel</option>
          <option value="WiFi">WiFi</option>
          <option value="Food">Food</option>
          <option value="Academics">Academics</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={showStarredOnly}
            onChange={() => setShowStarredOnly(!showStarredOnly)}
          />
          Show only ⭐
        </label>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="no-complaints-card">
          <h3>✅ There are no matching complaints.</h3>
          <p>Everything is looking good right now! 🎉</p>
        </div>
      ) : (
        <ul className="complaint-list">
          {filteredComplaints.map((complaint) => (
            <li key={complaint.id} className="complaint-item">
              <div className="complaint-main">
                <span className="complaint-text">{complaint.text}</span>
                <span className="complaint-category">📌 {complaint.category}</span>
                <span className="complaint-status">
                  🏷️ Status:
                  <select
                    value={complaint.status || 'Open'}
                    onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </span>
                <span className="complaint-date">
                  🕒 {new Date(complaint.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="complaint-actions">
                <button
                  className={`star-button ${complaint.starred ? 'starred' : ''}`}
                  onClick={() => toggleStar(complaint.id)}
                >
                  {complaint.starred ? '⭐' : '☆'}
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteComplaint(complaint.id)}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="admin-charts">
        <div className="admin-chart-box">
          <h3>📊 Complaints per Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4ea1ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="admin-chart-box">
          <h3>⏳ Complaints Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dateData}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="admin-chart-box">
          <h3>⭐ Starred vs Unstarred</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={starredData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {starredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
