// src/pages/DebateSetup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DebateSetup.css';

const DebateSetup = () => {
  const navigate = useNavigate();
  
  const [topic, setTopic] = useState('');
  const [rounds, setRounds] = useState(2);

  const handleCreateDebate = () => {
    if (!topic) {
      alert('Please enter a debate topic');
      return;
    }
    // Navigate to the record page, sending topic & rounds as query params (or use context)
    navigate(`/record-argument?topic=${encodeURIComponent(topic)}&rounds=${rounds}`);
  };

  return (
    <div className="debate-setup-container">
      <div className="debate-setup-content">
        <h2 className="debate-setup-title">Create Your Debate</h2>
        
        <div className="debate-setup-form">
          <div className="form-field">
            <label htmlFor="topic">Debate Topic</label>
            <input
              id="topic"
              type="text"
              placeholder="e.g. Best pizza topping"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="rounds">Number of Rounds</label>
            <select
              id="rounds"
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
            >
              <option value={1}>1 Round</option>
              <option value={2}>2 Rounds</option>
              <option value={3}>3 Rounds</option>
            </select>
          </div>

          <button className="create-debate-button" onClick={handleCreateDebate}>
            Create Debate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebateSetup;