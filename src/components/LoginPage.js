import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import DarkModeToggle from "./DarkModeToggle";

const fakeAuthApi = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "user" && password === "password") {
        resolve({ success: true });
      } else {
        reject({ success: false, message: "Invalid credentials" });
      }
    }, 1000); // Simulate network latency with a 1-second delay
  });
};

const LoginPage = ({ setAuth }) => {
  const { isDarkMode } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fakeAuthApi(username, password)
      .then((response) => {
        setLoading(false);
        if (response.success) {
          setAuth(true);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
        <DarkModeToggle />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
