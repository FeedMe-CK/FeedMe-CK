import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
import { googleLogin as Google } from './services/auth';

function App() {
  return (
    <div className="App">
      <a href='http://localhost:5555/api/auth/google'>
              
      <button className="auth-btn sort-button">Sign up with Google</button>
      </a>
    </div>
  );
}

export default App;
