// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DebateSetup from './pages/DebateSetup';
import RecordArgument from './pages/RecordArgument';
import RecordResponse from './pages/RecordResponse';
import VotePage from './pages/VotePage';
import DebatePage from './pages/DebatePage';
import SetupPage from './pages/SetupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<DebateSetup />} />
        <Route path="/record-argument" element={<RecordArgument />} />
        <Route path="/setup" element={<SetupPage />} />

        {/* The main debate page, where we fetch debate details by ID */}
        <Route path="/debate/:debateId" element={<DebatePage />} />

        {/* If you still need a response recording page, use a different path */}
        <Route path="/debate/:debateId/response" element={<RecordResponse />} />
        <Route path="/vote/:debateId" element={<VotePage />} />
      </Routes>
    </Router>
  );
}

export default App;