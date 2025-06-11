import React from 'react';
import './About.css';

const About = () => {
  const features = [
    {
      icon: 'bi-clock-history',
      title: 'Fast Delivery',
      description: 'Get your food delivered within 30 minutes of ordering'
    },
    {
      icon: 'bi-shield-check',
      title: 'Food Safety',
      description: 'All our partner restaurants follow strict food safety guidelines'
    },
    {
      icon: 'bi-heart',
      title: 'Best Quality',
      description: 'We partner with only the best restaurants in your area'
    },
    {
      icon: 'bi-cash-stack',
      title: 'Best Prices',
      description: 'Enjoy competitive prices and regular promotional offers'
    }
  ];

  return (
    <main className="about-page">
      <section className="hero-section">
        <div className="container">
          <h1>About Foodies</h1>
          <p className="lead">Delivering Happiness to Your Doorstep</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="grid grid-2">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2023, Foodies has been on a mission to transform the way people 
                experience food delivery. We believe that good food has the power to bring 
                joy and connect people.
              </p>
              <p>
                What started as a small startup has now grown into a trusted food delivery 
                platform, serving thousands of customers daily and partnering with the best 
                restaurants in the city.
              </p>
            </div>
            <div className="about-image">
              <img src="/about-image.jpg" alt="About Foodies" />
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="text-center">Why Choose Us</h2>
          <div className="grid grid-4 features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <i className={`bi ${feature.icon}`}></i>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="grid grid-4">
            <div className="stat-card">
              <h3>1M+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-card">
              <h3>500+</h3>
              <p>Restaurant Partners</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Cities</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2 className="text-center">Our Team</h2>
          <div className="grid grid-3">
            <div className="team-card card">
              <img src="/team-1.jpg" alt="Team Member" />
              <h3>John Doe</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-card card">
              <img src="/team-2.jpg" alt="Team Member" />
              <h3>Jane Smith</h3>
              <p>Head of Operations</p>
            </div>
            <div className="team-card card">
              <img src="/team-3.jpg" alt="Team Member" />
              <h3>Mike Johnson</h3>
              <p>Head of Technology</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About; 