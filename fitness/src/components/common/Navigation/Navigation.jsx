import { Link } from "react-router-dom";
import "./navigation.scss";

const Navigation = () => {
  return (
    <div className="container">
      <nav className="navigation">
        <div className="navigation__logo"></div>

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
            <Link to="/exercises">LOGIN</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
