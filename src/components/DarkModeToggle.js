// DarkModeToggle.js
import React from 'react';
import { useTheme } from './ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <label>
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      Dark Mode
    </label>
  );
};

export default DarkModeToggle;
