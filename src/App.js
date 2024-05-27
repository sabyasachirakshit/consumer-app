import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import { ThemeProvider } from './components/ThemeContext';
import "./styles/dark.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const setAuth = (auth) => {
    setIsAuthenticated(auth);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "login",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage setAuth={setAuth} />
    },
    {
      path: "dashboard",
      element: isAuthenticated ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/login" />
    }
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
    
  );
};

export default App;
