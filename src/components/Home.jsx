import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css'; 

const Home = () => {
  return (
    <div className="hero-container">
      <div className="hero-overlay">
        <h1>Welcome to the Event Management Platform</h1>
        <p>
          This platform allows you to create, manage, and view events seamlessly.
          Use the sidebar to navigate through the application.
        </p>
        <div className="button-container">
          <Link to="/login" className="button">Login</Link>
          <Link to="/signup" className="button">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
