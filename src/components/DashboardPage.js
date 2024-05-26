import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "./ThemeContext";
import DarkModeToggle from './DarkModeToggle';

const DashboardPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
        <DarkModeToggle />
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default DashboardPage;
