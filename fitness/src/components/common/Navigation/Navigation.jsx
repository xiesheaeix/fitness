import { Link, NavLink, useLocation } from "react-router-dom";
import "./navigation.scss";
import logo from "../../../assets/logo.svg";

const Navigation = () => {
  return (
    <div className="container">
      <nav className="navigation">
        <img src={logo} alt="logo" className="navigation__logo" />

        <ul className="navigation-list">
          <li className="navigation-list__item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              HOME
            </NavLink>
          </li>
          <li className="navigation-list__item">
            <NavLink
              to="/diets"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              DIETS
            </NavLink>
          </li>
          <li className="navigation-list__item">
            <NavLink
              to="/exercises"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              EXERCISES
            </NavLink>
          </li>

          <li className="navigation-list__item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              SIGN IN
            </NavLink>
          </li>

          <li className="navigation-list__item" hidden>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              LOG IN
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
