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
        {localStorage.getItem("JWT") ? (
          <li className="nav-item">
            <button
              onClick={() => localStorage.removeItem("JWT")}
              className="btn btn-danger ml-3"
            >
              Logout
            </button>
          </li>
        ) : (
          <React.Fragment>
            <li className="nav-item">
              <NavLink to="/login" className="btn btn-outline-danger ml-3">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="btn btn-danger ml-3">
                Sign Up
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  </nav>
);

export default Header;
