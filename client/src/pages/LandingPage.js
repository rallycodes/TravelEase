import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo-container">
          <div className="globe-icon">🌐</div>
          <h1 className="logo-text">TravelEase</h1>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/guides">Guides / Blog</Link></li>
            <li><Link to="/tools">Tools</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login / Sign Up</Link></li>
          </ul>
        </nav>
        <Link to="/map" className="start-exploring-btn">Start Exploring</Link>
      </header>

      <main className="landing-main">
        <div className="hero-content">
          <h2 className="hero-title">Your Complete Travel Companion</h2>
          <p className="hero-description">
            Discover everything you need to know before traveling to your dream 
            destination - from local SIM cards to restaurants, visa requirements, 
            and more.
          </p>

          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search for a country or city..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="search-btn">Search</button>
          </div>

          <div className="stats-container">
            <div className="stat-item">
              <h3 className="stat-number">190+</h3>
              <p className="stat-label">Countries</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">1K+</h3>
              <p className="stat-label">Travel Guides</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">24/7</h3>
              <p className="stat-label">AI Support</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">50K+</h3>
              <p className="stat-label">Happy Travelers</p>
            </div>
          </div>

          <a href="#features" className="explore-features-link">
            Explore All Features <span>→</span>
          </a>
        </div>
      </main>
    </div>
  );
};

export default LandingPage; 