import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecordingComponent from '../components/RecordingComponent';

const RecordResponse = () => {
  const { debateId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'friend.wav');

    try {
      await axios.post(`http://localhost:50001/submitResponse/${debateId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/vote/${debateId}`);
    } catch (error) {
      console.error('Error submitting response', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Record Your Response</h2>
      <RecordingComponent onSubmit={handleSubmit} submitLabel="Submit Response" />
    </div>
  );
};

export default RecordResponse;