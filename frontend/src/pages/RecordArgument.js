import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecordingComponent from '../components/RecordingComponent';
import axios from 'axios';
import './RecordArgument.css';

const RecordArgument = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic') || '';
  const rounds = Number(searchParams.get('rounds')) || 2;

  const [recordedBlob, setRecordedBlob] = useState(null);
  const [debateId, setDebateId]         = useState(null);
  const [transcript, setTranscript]     = useState('');
  const [loading, setLoading]           = useState(false);

  const shareLink = debateId
    ? `${window.location.origin}/debate/${debateId}`
    : '';

  const handleRecordingComplete = (blob) => {
    setRecordedBlob(blob);
  };

  const handleCreateDebate = async () => {
    if (!recordedBlob) {
      return alert('Please record your argument first.');
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('audio', recordedBlob, 'argument.webm');
      formData.append('topic', topic);
      formData.append('rounds', rounds);

      const res = await axios.post(
        'http://localhost:50001/createDebate',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setDebateId(res.data.debateId);
      setTranscript(res.data.transcript);
    } catch (err) {
      console.error(err);
      alert('Error creating debate. Check console.');
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => alert('Link copied! Send to your friend.'))
      .catch(() => alert('Could not copy link.'));
  };

  return (
    <div className="record-argument-page">
      <div className="record-card">
        <h2>Debate Topic:</h2>
        <p className="topic-text">{topic}</p>
        <p className="rounds-text">Rounds: {rounds}</p>

        <RecordingComponent
          onRecordingComplete={handleRecordingComplete}
          timeLimit={30}
        />

        {!debateId ? (
          <button
            className="submit-button"
            onClick={handleCreateDebate}
            disabled={loading}
          >
            {loading ? 'Processing…' : 'Submit & Create Debate'}
          </button>
        ) : (
          <>
            <h3>Your Transcript:</h3>
            <pre className="transcript-box">{transcript}</pre>
            <button className="invite-button" onClick={handleInvite}>
              Invite Friend to Respond
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecordArgument;