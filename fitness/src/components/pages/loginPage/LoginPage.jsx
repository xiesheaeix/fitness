import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import "./loginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
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
      navigate("/");
    } else {
      alert("Login failed: " + JSON.stringify(data));
    }
  };

  const handleSignup = async (formData) => {
    const response = await fetch("http://localhost:8000/api/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful! You can now log in.");
    } else {
      alert("Signup failed: " + JSON.stringify(data));
    }
  };

  return (
    <div className="login">
        <AuthForm onLogin={handleLogin} onSignup={handleSignup} />
    </div>
  );
};

export default LoginPage;
