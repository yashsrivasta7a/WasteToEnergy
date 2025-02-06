import React from 'react';
import './Landing.css';
import background from '../assets/background.png';
import illustration from '../assets/illustration.png';
import LoginButton from '../components/Login';


function Landing() {
    return (
        <div className="container">
            <div className="text-section">
                <h1 className="heading">
                    Help transform <span className="highlight">waste</span> into energy and get rewarded 
                    with points for your <span className="highlight">eco-friendly</span> efforts.
                </h1>
                <LoginButton />
            </div>
            <div className="image-section">
                <img src={background} alt="Eco-friendly background" className="background-image" />
                <img src={illustration} alt="Illustration" className="illustration" />
            </div>
        </div>
    );
}

export default Landing;
