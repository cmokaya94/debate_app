// src/components/RecordingComponent.js
import React, { useState, useRef, useEffect } from 'react';

const RecordingComponent = ({ onRecordingComplete, timeLimit = 30 }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(timeLimit);
  const [recording, setRecording] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const progress = ((timeLimit - countdown) / timeLimit) * 100;

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startRecording = async () => {
    setRecording(null);
    setCountdown(timeLimit);
    audioChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.start();
    setIsRecording(true);

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const webmBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setRecording(webmBlob);
      if (onRecordingComplete) onRecordingComplete(webmBlob);
    };

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      setCountdown(0);
    }
  };

  return (
    <div className="recording-component">
      {!isRecording && (
        <button className="record-button" onClick={startRecording}>
          Start Recording
        </button>
      )}
      {isRecording && (
        <>
          <button className="record-button" onClick={stopRecording}>
            Stop Recording
          </button>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="time-left-label">Time Left: {countdown}s</div>
        </>
      )}
      {recording && (
        <div className="audio-preview">
          <audio controls src={URL.createObjectURL(recording)} />
        </div>
      )}
    </div>
  );
};

export default RecordingComponent;