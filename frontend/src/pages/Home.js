// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">Welcome to the Debate App</h1>
      <p className="subtitle">Start a fun and friendly challenge with your friends!</p>
      <Link to="/setup" className="cta-button">
        Challenge Your Friend
      </Link>
    </div>
  );
};

export default Home;