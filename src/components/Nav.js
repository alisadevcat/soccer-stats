import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
const setActive = ({ isActive }) => (isActive ? "active-site-nav__link" : "" );

const Nav = () => {
  return (
    <nav className="navbar bg-secondary">
        <div className="site-nav container-fluid">
          <div className="site-nav__logo">
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <ul className="site-nav__list row">
            <li className="ml-1 text-hover-blue display-block">
              <NavLink className={setActive} to="/competitions">
                Лиги
              </NavLink>
            </li>
            <li className="ml-1 text-hover-blue display-block">
              <NavLink className={setActive} to="/teams">
                Команды
              </NavLink>
            </li>
          </ul>
        </div>
    </nav>
  );
};
export default Nav;
