import { Link } from "react-router-dom";
import "./navigation.scss";

const Navigation = () => {
  return (
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
      </ul>
    </nav>
  );
};

export default Navigation;
