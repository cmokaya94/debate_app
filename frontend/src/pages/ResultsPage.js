import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResultsPage = () => {
  const { debateId } = useParams();
  const [debate, setDebate] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:50001/getResults?debateId=${debateId}`);
        setDebate(res.data);
      } catch (error) {
        console.error('Error fetching debate results', error);
      }
    };
    fetchResults();
  }, [debateId]);

  if (!debate) return <p>Loading results...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Debate Results</h2>
      <p>AI Score: {debate.aiScore}</p>
      <p>Final Score: {debate.finalScore}</p>
      <div>
        <h3>Initiator's Recording:</h3>
        <audio controls src={`http://localhost:5001/${debate.initiatorRecording}`} />
      </div>
      {debate.friendRecording && (
        <div>
          <h3>Friend's Response:</h3>
          <audio controls src={`http://localhost:5001/${debate.friendRecording}`} />
        </div>
      )}
      <p>Share this debate with your friends using the URL!</p>
    </div>
  );
};

export default ResultsPage;