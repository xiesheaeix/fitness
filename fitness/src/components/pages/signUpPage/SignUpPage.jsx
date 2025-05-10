import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./signUpPage.scss";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          password2: formData.password2,
          email: formData.email,
        }),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        const data = await response.json();
        alert("Registration failed: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="signup">
      <div className="signup-wrapper">
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Login"
            required
            value={formData.username}
            onChange={handleChange}
          />
           <input 
           type="email" 
           name="email"
           placeholder="example@gmail.com"
            required
            value={formData.email}
            onChange={handleChange}/>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password2"
            placeholder="Re-enter Password"
            required
            value={formData.password2}
            onChange={handleChange}
          />
          <button type="submit" className="log-in__action">Sign Up</button>
        </form>

        <div className="signup-controls">
          <Link to="/login" className="sign-up__action">
            Back to Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
