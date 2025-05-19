import React from 'react';
import './SetupPage.css';

const SetupPage = () => {
  return (
    <div className="setup-container">
      <div className="setup-card">
        <div className="logo">🥚</div>
        <h1>Welcome to <br />Chicken or The Egg</h1>
        <p>Sign in to continue your journey</p>
        <button className="google-button">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google icon" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SetupPage;