import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/user";
import SearchForm from "../Forms/Search";

const Header = ({ brand, isAuth, logout }) => (
  <nav className="navbar navbar-expand-md navbar-dark bg-danger m-0 p-0">
    <NavLink
      className="col-md-2 col-sm-3 mr-5 navbar-brand py-3 text-center"
      style={{ backgroundColor: "rgba(0,0,0,.1)" }}
      to="/"
    >
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
