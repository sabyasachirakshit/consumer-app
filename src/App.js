import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Redirect,
  Route,
  Link,
} from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (auth) => {
    setIsAuthenticated(auth);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "login",
      element: isAuthenticated? <Link to="/dashboard" />:<LoginPage setAuth={setAuth} />
    },
    {
      path:"dashboard",
      element:isAuthenticated ? <DashboardPage /> : <Link to="/login" />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
