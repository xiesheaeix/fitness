import { Link } from "react-router-dom";
import "./loginPage.scss";

const LoginPage = () => {
  return (
    <div className="login">
      <div className="login-wrapper">
        <form action="" className="login-form">
          <input
            type="text"
            className="input-field"
            placeholder="Login"
            required
          />
          <input
            type="email"
            className="input-field"
            placeholder="Password"
            required
          />
        </form>

        <div className="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>

        <div className="login-controls">
          <Link to="/signup" className="sign-up__action">
            Sign up
          </Link>
          <button className="log-in__action">Log in</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
