import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMovie } from "../../actions/movie";
import axios from "axios";

class Search extends Component {
  state = {
    search: "",
    results: []
  };

  handleChange = e => {
    this.setState({ search: e.target.value });
    if (this.state.search.length > 2) {
      this.searchMovies();
    }
  };

  searchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${
          this.state.search
        }&api_key=b8579c1fd967de5bf38fd125a1b4b0bc`
      )
      .then(res => this.setState({ results: res.data.results }));
  };

  goToMovie = movie_id => {
    this.props.fetchMovie(movie_id, this.props.userId);
    this.setState({ results: [] });
  };

  componentDidMount = () => {};

  render() {
    return (
      <form
        className="form-inline w-100 position-relative"
        onSubmit={() => console.log("search subitted...")}
      >
        <i className="fas fa-search position-absolute" style={{ left: 0 }} />
        <input
          className="form-control pl-4 w-100 bg-transparent border-0 text-light"
          type="text"
          placeholder="Search"
          onChange={this.handleChange}
          value={this.state.search}
        />
        {this.state.results.length > 0 && (
          <ul
            className="list-group position-absolute bg-dark rounded-0"
            style={{ top: "62px", zIndex: 99999 }}
          >
            {this.state.results.splice(0, 5).map(res => (
              <li key={res.id} className="list-group-item text-black text-dark">
                <Link
                  to={`/movie/${res.id}`}
                  className="btn btn-link"
                  onClick={() => {
                    this.goToMovie(res.id);
                  }}
                >
                  <img
                    style={{ height: "50px" }}
                    className="img-fluid rounded mr-3"
                    src={`http://image.tmdb.org/t/p/w185/${res.poster_path}`}
                    alt={res.title}
                  />
                  {res.title} ({new Date(res.release_date).getFullYear()})
                </Link>
              </li>
            ))}
          </ul>
        )}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchMovie }
)(Search);
