
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DebatePage.css';

const DebatePage = () => {
  const { debateId } = useParams();
  const [debate, setDebate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDebate = async () => {
      try {
        const res = await axios.get(`http://localhost:50001/getDebate?debateId=${debateId}`);
        setDebate(res.data);
      } catch (err) {
        console.error('Error loading debate:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDebate();
  }, [debateId]);

  if (loading) return <div className="loading">🥊 Loading the match...</div>;
  if (!debate) return <div>Debate not found</div>;

  return (
    <div className="debate-container">
      <h2>🥊 {debate.topic}</h2>
      <h3>Round {debate.currentRound} of {debate.totalRounds}</h3>

      <div className="rounds-grid">
        <div className="player-column">
          <h4>Player 1</h4>
          {debate.rounds.map((round, index) => (
            <div key={index} className="round-card">
              <p><strong>Round {index + 1}</strong></p>
              <p>{round.player1Feedback || 'Waiting...'}</p>
            </div>
          ))}
        </div>
        <div className="player-column">
          <h4>Player 2</h4>
          {debate.rounds.map((round, index) => (
            <div key={index} className="round-card">
              <p><strong>Round {index + 1}</strong></p>
              <p>{round.player2Feedback || 'Waiting...'}</p>
            </div>
          ))}
        </div>
      </div>

      {!debate.rounds[0].player2AudioUrl && (
        <div className="share-section">
          <p>🔗 Share this link with your opponent to continue the match:</p>
          <code>{window.location.href}</code>
        </div>
      )}
    </div>
  );
};

export default DebatePage;
