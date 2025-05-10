import "./loginPage.scss";

const LoginPage = () => {
  return (
    <div className="login">
      <div className="login-wrapper">
        <form action="" className="login-form">
          <input type="text" className="input-field" placeholder="Login" />
          <input type="email" className="input-field" placeholder="Password" />
        </form>

        <div className="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>

        <div className="login-controls">
          <button className="sign-up__action">Sign up</button>
          <button className="log-in__action">Log in</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
