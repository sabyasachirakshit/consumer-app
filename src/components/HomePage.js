import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useTheme } from "./ThemeContext";
import DarkModeToggle from "./DarkModeToggle";

const Homepage = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={isDarkMode ? "dark" : "light"}>
        <DarkModeToggle />
      <h2>Home Page</h2>
      <p>Welcome to the Home Page!</p>
      {/* Use Link component instead of anchor tag */}
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Homepage;
