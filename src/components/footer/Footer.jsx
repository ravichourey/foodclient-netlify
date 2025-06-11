import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <div className="footer-brand">
            <i className="bi bi-egg-fried"></i>
            <h3>Foodies</h3>
          </div>
          <p className="footer-description">
            Delivering happiness to your doorstep. Experience the best food delivery service in town.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="social-link">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul className="footer-links">
            <li><Link to="/explore?category=pizza">Pizza</Link></li>
            <li><Link to="/explore?category=burger">Burgers</Link></li>
            <li><Link to="/explore?category=sushi">Sushi</Link></li>
            <li><Link to="/explore?category=dessert">Desserts</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul className="contact-info">
            <li>
              <i className="bi bi-geo-alt"></i>
              <span>123 Food Street, Foodie City, FC 12345</span>
            </li>
            <li>
              <i className="bi bi-telephone"></i>
              <span>+1 234 567 8900</span>
            </li>
            <li>
              <i className="bi bi-envelope"></i>
              <span>support@foodies.com</span>
            </li>
            <li>
              <i className="bi bi-clock"></i>
              <span>Open: 09:00 AM - 11:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} Foodies. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 