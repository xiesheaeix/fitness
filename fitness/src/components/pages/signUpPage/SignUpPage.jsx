import { Link } from "react-router-dom";
import "./signUpPage.scss";

const SignUpPage = () => {
  return (
    <div className="signup">
      <div className="signup-wrapper">
        <form action="" className="signup-form">
          <input type="text" required placeholder="Login" />
          <input type="password" required placeholder="Password" />
          <input type="password" required placeholder="Re-enter assword" />
        </form>

        <div className="signup-controls">
          <Link to="/login" className="sign-up__action">
            Back to Log In
          </Link>
          <button className="log-in__action">Log in</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
