import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VotePage = () => {
  const { debateId } = useParams();
  const [vote, setVote] = useState(50);
  const navigate = useNavigate();

  const handleVote = async () => {
    try {
      await axios.post('http://localhost:50001/voteDebate', { debateId, vote });
      navigate(`/results/${debateId}`);
    } catch (error) {
      console.error('Error submitting vote', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Listen and Vote</h2>
      <p>Use the slider to rate the debate argument (0 to 100):</p>
      <input
        type="range"
        min="0"
        max="100"
        value={vote}
        onChange={(e) => setVote(Number(e.target.value))}
      />
      <span>{vote}</span>
      <br />
      <button onClick={handleVote}>Submit Vote</button>
    </div>
  );
};

export default VotePage;