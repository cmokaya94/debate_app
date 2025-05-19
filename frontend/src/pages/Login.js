import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("🟡 Waiting for Google popup...");
      const result = await signInWithPopup(auth, provider);
      console.log('✅ User signed in:', result.user);

      // Optional: Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(result.user));

      // Redirect to home page after login
      navigate('/home');
    } catch (err) {
      console.error('❌ Login error:', err.message);
      alert('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <img src="/egg-icon.png" alt="Egg Icon" className="egg-icon" />
      <h1>Welcome to <br /> <strong>Chicken or The Egg</strong></h1>
      <p>Sign in to continue your journey</p>
      <button className="google-button" onClick={handleLogin}>
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="google-icon"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default Login;