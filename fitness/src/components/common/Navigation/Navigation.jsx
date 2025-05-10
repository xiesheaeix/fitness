import { Link } from "react-router-dom";
import "./navigation.scss";
import logo from "../../../assets/logo.svg";

const Navigation = () => {
  return (
    <div className="container">
      <nav className="navigation">
        <img src={logo} alt="logo" className="navigation__logo" />

        <ul className="navigation-list">
          <li className="navigation-list__item">
            <Link to="/">HOME</Link>
          </li>
          <li className="navigation-list__item">
            <Link to="/diets">DIETS</Link>
          </li>
          <li className="navigation-list__item">
            <Link to="/exercises">EXERCISES</Link>
          </li>

          <li className="navigation-list__item">
            <Link to="/signup">SIGN UP</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
