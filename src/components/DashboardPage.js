import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default DashboardPage;
