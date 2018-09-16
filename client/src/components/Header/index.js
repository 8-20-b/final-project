import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/user";
import SearchForm from "../Forms/Search";

const Header = ({ brand, isAuth, logout }) => (
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
      <SearchForm />
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
        {isAuth ? (
          <li className="nav-item">
            <button onClick={() => logout()} className="btn btn-danger ml-3">
              Logout
            </button>
          </li>
        ) : (
          <React.Fragment>
            <li className="nav-item">
              <NavLink to="/login" className="btn btn-outline-danger ml-3">
                Log In
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

const mapStateToProps = state => {
  return {
    isAuth: !!state.user.token
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Header);
