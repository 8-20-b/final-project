import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/user";
import SearchForm from "../Forms/Search";

const Header = ({ brand, isAuth, logout }) => (
  <nav className="navbar navbar-expand-md navbar-dark bg-danger m-0 p-0">
    <NavLink
      className="col-md-2 col-sm-3 mr-0 mr-md-5 navbar-brand py-3 text-center pr-0"
      style={{ backgroundColor: "rgba(0,0,0,.1)" }}
      to="/"
    >
      <img
        className="d-none d-md-block"
        src="/images/logo.png"
        alt={brand}
        style={{ height: "32px" }}
      />
      <img
        className="d-block d-md-none"
        src="/images/logo-mobile.png"
        alt={brand}
        style={{ height: "32px" }}
      />
    </NavLink>
    <div className="d-block mr-md-5 search-form">
      <SearchForm />
    </div>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#mobileNav"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="d-block d-md-none w-100">
      <div className="collapse navbar-collapse" id="mobileNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/movies/recently-added">
              Recently Added
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/movies/new-releases/">
              New Releases
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/movies/upcoming">
              Upcoming
            </NavLink>
          </li>
          {isAuth && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/movies/favorites">
                  Favorites
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/movies/watch-later">
                  Watch Later
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
        <div className="d-flex justify-content-between p-3 bg-dark">
          {isAuth ? (
            <button
              onClick={() => logout()}
              className="btn btn-block btn-outline-light"
            >
              Logout
            </button>
          ) : (
            <React.Fragment>
              <NavLink
                to="/login"
                className="btn btn-outline-light btn-block mr-2"
              >
                Log In
              </NavLink>
              <NavLink to="/register" className="btn btn-light btn-block ml-2">
                Sign Up
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
    <div className="collapse navbar-collapse" id="mainNav">
      <ul className="navbar-nav ml-auto mr-3">
        {isAuth ? (
          <li className="nav-item">
            <button
              onClick={() => logout()}
              className="btn btn-outline-light ml-3"
            >
              Logout
            </button>
          </li>
        ) : (
          <React.Fragment>
            <li className="nav-item">
              <NavLink to="/login" className="btn btn-outline-light ml-3">
                Log In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="btn btn-light ml-3">
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
