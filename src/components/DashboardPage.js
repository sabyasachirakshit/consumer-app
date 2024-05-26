import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "./ThemeContext";
import DarkModeToggle from './DarkModeToggle';

const DashboardPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('active'); // State to track active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <DarkModeToggle />
      <h2>Dashboard</h2>
      <div className="tabs">
        <button onClick={() => handleTabClick('active')} className={activeTab === 'active' ? 'active' : ''}>Active Orders</button>
        <button onClick={() => handleTabClick('completed')} className={activeTab === 'completed' ? 'active' : ''}>Completed Orders</button>
        <button>+sale order</button>
      </div>
      <div className="orders">
        {activeTab === 'active' && <h3>Active Sale Orders</h3>}
        {activeTab === 'completed' && <h3>Completed Sale Orders</h3>}
        
        {/* Content for active and completed sale orders */}
      </div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default DashboardPage;
