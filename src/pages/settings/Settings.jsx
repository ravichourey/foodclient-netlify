import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { StoreContext } from '../../context/StoreContext';
import './Settings.css';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { token } = useContext(StoreContext);

  const notificationSettings = [
    {
      id: 'order_updates',
      label: 'Order Updates',
      description: 'Get notified about your order status'
    },
    {
      id: 'promotions',
      label: 'Promotional Offers',
      description: 'Receive updates about deals and discounts'
    },
    {
      id: 'newsletter',
      label: 'Newsletter',
      description: 'Weekly newsletter with food trends and recipes'
    }
  ];

  return (
    <main className="settings-page">
      <div className="container">
        <h1 className="settings-title">Settings</h1>

        <div className="settings-grid">
          {/* Theme Settings */}
          <section className="settings-section card">
            <h2>Theme Settings</h2>
            <div className="theme-settings">
              <div className="theme-option">
                <div className="theme-info">
                  <h3>Dark Mode</h3>
                  <p>Switch between light and dark theme</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section className="settings-section card">
            <h2>Notifications</h2>
            <div className="notification-settings">
              {notificationSettings.map(setting => (
                <div key={setting.id} className="notification-item">
                  <div className="notification-info">
                    <h3>{setting.label}</h3>
                    <p>{setting.description}</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Account Settings */}
          <section className="settings-section card">
            <h2>Account</h2>
            {token ? (
              <div className="account-settings">
                <div className="form-group">
                  <label>Email Notifications</label>
                  <select className="form-control">
                    <option>All emails</option>
                    <option>Important only</option>
                    <option>None</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <select className="form-control">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <button className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="login-prompt">
                <p>Please log in to access account settings</p>
                <button className="btn btn-primary">Log In</button>
              </div>
            )}
          </section>

          {/* Privacy Settings */}
          <section className="settings-section card">
            <h2>Privacy</h2>
            <div className="privacy-settings">
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Allow location access for better delivery experience</span>
                </label>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Share order history with restaurants for personalized recommendations</span>
                </label>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Participate in customer feedback program</span>
                </label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Settings; 