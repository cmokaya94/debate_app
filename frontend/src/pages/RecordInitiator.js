// src/pages/RecordInitiator.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RecordingComponent from '../components/RecordingComponent';
import './RecordInitiator.css';

const RecordInitiator = () => {
  const navigate = useNavigate();

  // State for debate config
  const [topic, setTopic] = useState('');
  const [rounds, setRounds] = useState(3);

  // State for the recorded blob
  const [recordedBlob, setRecordedBlob] = useState(null);

  // State for AI feedback (optional demonstration)
  const [transcript, setTranscript] = useState('');
  const [aiScore, setAiScore] = useState(null);

  // Capture the recorded audio from the RecordingComponent
  const handleRecordingComplete = (audioBlob) => {
    setRecordedBlob(audioBlob);
  };

  // (Optional) Example function to transcribe audio and get AI rating
  // In real use, you'd likely store the audio on your backend,
  // transcribe it with an API like OpenAI's Whisper, then send the
  // transcription to ChatGPT for rating.
  const handleTranscribeAndRate = async () => {
    try {
      // 1) Upload audio to your backend for transcription
      const formData = new FormData();
      formData.append('audio', recordedBlob, 'initiator.wav');

      // Example endpoint to handle transcription on backend
      const transcriptionRes = await axios.post(
        'http://localhost:50001/transcribeAudio',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const text = transcriptionRes.data.transcript;
      setTranscript(text);

      // 2) Send transcript to AI for rating
      const aiRes = await axios.post('http://localhost:50001/rateTranscript', {
        transcript: text
      });
      setAiScore(aiRes.data.aiScore);
    } catch (error) {
      console.error('Error transcribing or rating audio:', error);
    }
  };

  // Create the debate on the backend
  const handleCreateDebate = async () => {
    if (!recordedBlob) {
      alert('Please record audio before creating a debate.');
      return;
    }

    const formData = new FormData();
    formData.append('audio', recordedBlob, 'initiator.wav');
    formData.append('topic', topic);
    formData.append('rounds', rounds);

    try {
      // POST to your backend to create the debate
      const res = await axios.post('http://localhost:50001/createDebate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Navigate to the new debate page
      navigate(`/debate/${res.data.debateId}`);
    } catch (error) {
      console.error('Error creating debate', error);
    }
  };

  return (
    <div className="record-initiator-container">
      <div className="record-initiator-content">
        <h2 className="record-initiator-title">Record Your Argument</h2>

        {/* Form for topic and rounds */}
        <div className="record-initiator-form">
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
        </div>

        {/* Recording Section (30-second limit) */}
        <RecordingComponent
          timeLimit={30}
          onRecordingComplete={handleRecordingComplete}
        />

        <div className="record-button-section">
          {/* (Optional) Button to demonstrate AI transcription + rating */}
          <button className="record-button" onClick={handleTranscribeAndRate}>
            Transcribe & Rate (Demo)
          </button>

          {transcript && (
            <p>
              <strong>Transcript:</strong> {transcript}
            </p>
          )}

          {aiScore !== null && (
            <p>
              <strong>AI Score:</strong> {aiScore}/100
            </p>
          )}

          {/* Finally, create the debate */}
          <button className="submit-debate-button" onClick={handleCreateDebate}>
            Create Debate
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordInitiator;