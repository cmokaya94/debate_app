import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RecordingComponent from '../components/RecordingComponent';
import axios from 'axios';
import './RecordArgument.css';

const RecordArgument = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const topic = searchParams.get('topic') || '';
  const rounds = Number(searchParams.get('rounds')) || 2;

  const [recordedBlob, setRecordedBlob] = useState(null);

  const handleRecordingComplete = (audioBlob) => {
    setRecordedBlob(audioBlob);
  };

  const handleCreateDebate = async () => {
    if (!recordedBlob) {
      alert('Please record your audio before submitting your debate.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('audio', recordedBlob, 'debate.webm');
      formData.append('topic', topic);
      formData.append('rounds', rounds);

      const res = await axios.post('http://localhost:50001/createDebate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const debateId = res.data.debateId;

      if (!debateId) {
        alert('Debate ID not returned from server.');
        console.error('❌ No debateId returned:', res.data);
        return;
      }

      console.log('✅ Created debate with ID:', debateId);
      navigate(`/debate/${debateId}`);
    } catch (error) {
      console.error('Error creating debate:', error);
      alert('There was an error creating your debate.');
    }
  };

  return (
    <div className="record-argument-page">
      <div className="record-card">
        <h2 className="record-card-title">Debate Topic:</h2>
        <p className="record-card-topic">{topic}</p>
        <h4 className="record-card-rounds">Number of Rounds: {rounds}</h4>

        <RecordingComponent onRecordingComplete={handleRecordingComplete} timeLimit={30} />

        <button className="submit-button" onClick={handleCreateDebate}>
          Submit & Create Debate
        </button>
      </div>
    </div>
  );
};

export default RecordArgument;