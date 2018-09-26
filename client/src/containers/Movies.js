import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../actions/movie";
import Navigation from "../components/Navigation";
import MoviesList from "../components/MoviesList";

class Movies extends Component {
  componentDidMount = () => {
    this.props.fetchMovies(this.props.match.params.query, this.props.userId);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.match.params.query !== this.props.match.params.query) {
      this.props.fetchMovies(nextProps.match.params.query, this.props.userId);
    }
  };

  render() {
    const pageTitle = this.props.match.params.query
      .replace("-", " ")
      .toLowerCase()
      .replace(/\b[a-z]/g, letter => letter.toUpperCase());

    return (
      <div className="container-fluid">
        <div className="row">
          <Navigation query={this.props.match.params.query} />
          <main
            className="col-md-9 ml-sm-auto col-lg-10 pt-md-5 px-md-5"
            style={{ height: "calc(100vh - 62px)" }}
          >
            <h1 className="mb-4">{pageTitle}</h1>
            <MoviesList movies={this.props.movies} />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    movies: state.movie.movies
  };
};

export default connect(
  mapStateToProps,
  { fetchMovies }
)(Movies);
