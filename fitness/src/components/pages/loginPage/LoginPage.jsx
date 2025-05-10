import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./loginPage.scss";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      alert("Login successful!");
      navigate("/"); // переход на главную страницу или другую
    } else {
      alert("Login failed: " + JSON.stringify(data));
    }
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            className="input-field"
            placeholder="Login"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="log-in__action">Log in</button>
        </form>

        <div className="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>

        <div className="login-controls">
          <Link to="/signup" className="sign-up__action">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
