import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <main className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1>Oops! Page Not Found</h1>
          <p>
            Looks like we can't find the page you're looking for. 
            Maybe you're hungry? Let's get you back to our delicious menu!
          </p>
          <div className="action-buttons">
            <Link to="/" className="btn btn-primary">
              <i className="bi bi-house-door"></i>
              Back to Home
            </Link>
            <Link to="/explore" className="btn btn-outline">
              <i className="bi bi-search"></i>
              Explore Menu
            </Link>
          </div>
          <div className="illustration">
            <img src="/404-illustration.svg" alt="404 Error Illustration" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound; 