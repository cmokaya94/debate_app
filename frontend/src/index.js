import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import RecordArgument from './pages/RecordArgument';
import DebatePage from './pages/DebatePage';
import Login from './pages/Login'; // 👈 Import Login
import SetupPage from './pages/SetupPage'; // ✅ Add this line
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/setup" element={<SetupPage />} /> {/* ✅ Add this route */}
        <Route path="/record" element={<RecordArgument />} />
        <Route path="/debate/:debateId" element={<DebatePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);