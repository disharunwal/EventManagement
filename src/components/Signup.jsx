import React from 'react';
import './LoginSignup.css'; 
import characterImage from '../assets/vecteezy_3d-male-character-presenting-to-the-right-with-confidence_24658854.png'; // Adjust path if needed

const Signup = () => {
    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Signup</h2>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Your Email" />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" placeholder="Your Password" />
                </div>
                <button className="auth-btn">Signup</button>
            </div>
            <div className="character-image-container">
                <img src={characterImage} alt="3D Character" />
            </div>
        </div>
    );
};

export default Signup;
