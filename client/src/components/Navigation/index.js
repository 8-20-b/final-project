import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ query }) => (
  <nav className="col-md-3 col-lg-2 d-none d-md-block bg-dark p-0">
    <div className="position-sticky">
      <ul className="nav flex-column mt-5">
        <li className="nav-item">
          <NavLink
            className="nav-link d-flex justify-content-between"
            to="/movies/new-releases/"
          >
            New Releases
            {query === "new-releases" && (
              <i className="fas fa-chevron-right mt-1" />
            )}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link d-flex justify-content-between"
            to="/movies/trending"
          >
            Trending
            {query === "trending" && (
              <i className="fas fa-chevron-right mt-1" />
            )}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link d-flex justify-content-between"
            to="/movies/upcoming"
          >
            Upcoming
            {query === "upcoming" && (
              <i className="fas fa-chevron-right mt-1" />
            )}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link d-flex justify-content-between"
            to="/movies/favorites"
          >
            Favorites
            {query === "favorites" && (
              <i className="fas fa-chevron-right mt-1" />
            )}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link d-flex justify-content-between"
            to="/movies/watch-later"
          >
            Watch Later
            {query === "watch-later" && (
              <i className="fas fa-chevron-right mt-1" />
            )}
          </NavLink>
        </li>
      </ul>
      <hr className="mx-4" />
      <h6 className="sidebar-heading px-4 mt-4 mb-1 text-muted">
        <span>Recet Activities</span>
      </h6>
      <ul className="nav flex-column mb-2">
        <li className="nav-item">
          <div className="nav-link" href="#">
            Current month
          </div>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navigation;
