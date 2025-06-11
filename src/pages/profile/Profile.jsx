import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: ''
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Load user data from localStorage or context
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    setFormData({
      name: userData.name || user?.name || '',
      email: userData.email || user?.email || '',
      phone: userData.phone || user?.phone || '',
      address: userData.address || user?.address || '',
      avatar: userData.avatar || user?.avatar || '/default-avatar.png'
    });
  }, [user, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for persistence
    localStorage.setItem('userData', JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { icon: 'bi-bag-check', label: 'Orders', value: '24' },
    { icon: 'bi-heart', label: 'Favorites', value: '12' },
    { icon: 'bi-star', label: 'Reviews', value: '8' },
    { icon: 'bi-gift', label: 'Points', value: '350' }
  ];

  const recentOrders = [
    {
      id: '1',
      date: '2024-02-20',
      status: 'Delivered',
      items: ['Pizza Margherita', 'Coke'],
      total: '₹450'
    },
    {
      id: '2',
      date: '2024-02-18',
      status: 'Delivered',
      items: ['Chicken Biryani', 'Raita'],
      total: '₹280'
    },
    {
      id: '3',
      date: '2024-02-15',
      status: 'Delivered',
      items: ['Butter Chicken', 'Naan'],
      total: '₹520'
    }
  ];

  return (
    <main className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-cover">
            <div className="profile-avatar-wrapper">
              <div className="avatar-container">
                <img 
                  src={formData.avatar}
                  alt="Profile" 
                  className="profile-avatar"
                />
                {isEditing && (
                  <label className="avatar-upload">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                      hidden
                    />
                    <i className="bi bi-camera"></i>
                  </label>
                )}
              </div>
              <div className="profile-info">
                <h1>{formData.name || 'Welcome!'}</h1>
                <p>{formData.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-grid">
            {/* User Information Card */}
            <section className="profile-section card">
              <div className="section-header">
                <h2>Personal Information</h2>
                <button 
                  className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
                  onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="form-text">{formData.name || 'Not set'}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p className="form-text">{formData.email || 'Not set'}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="form-text">{formData.phone || 'Not set'}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Delivery Address</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your delivery address"
                        rows="3"
                      ></textarea>
                    ) : (
                      <p className="form-text">{formData.address || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </form>
            </section>

            {/* Stats Section */}
            <section className="profile-section card">
              <h2>Your Stats</h2>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-icon">
                      <i className={`bi ${stat.icon}`}></i>
                    </div>
                    <div className="stat-info">
                      <h3>{stat.label}</h3>
                      <p>{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Orders Section */}
            <section className="profile-section card">
              <h2>Recent Orders</h2>
              <div className="orders-list">
                {recentOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-id">Order #{order.id}</div>
                      <div className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </div>
                    </div>
                    <div className="order-items">
                      {order.items.join(', ')}
                    </div>
                    <div className="order-footer">
                      <div className="order-date">{order.date}</div>
                      <div className="order-total">{order.total}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile; 