import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Redirect,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <RouterProvider router={router} />
  );
};

export default App;
