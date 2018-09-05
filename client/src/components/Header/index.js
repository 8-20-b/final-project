import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ brand }) => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <NavLink className="navbar-brand" to="/">
      {brand}
    </NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarCollapse"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">
            Discover
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/movies">
            Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/shows">
            TV Shows
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/actors">
            Actors
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="btn btn-outline-primary ml-5">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/register" className="btn btn-primary ml-3">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
