import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMovie, addToList, removeFromList } from "../actions/movie";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Navigation from "../components/Navigation";
import MovieTabs from "../components/MovieTabs";

class Movie extends Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
    isAuth: PropTypes.bool.isRequired
  };

  state = {
    trailer: "",
    rating: 0
  };

  componentDidMount = () => {
    this.props.fetchMovie(this.props.match.params.movie_id, this.props.userId);
    this.searchTrailer();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.match.params.movie_id !== this.props.match.params.movie_id) {
      this.props.fetchMovie(nextProps.match.params.movie_id, this.props.userId);
    }
  };

  searchTrailer = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.movie_id
        }/videos?api_key=b8579c1fd967de5bf38fd125a1b4b0bc`
      )
      .then(videos => {
        if (Object.keys(videos.data.results).length > 0) {
          this.setState({
            trailer: `https://www.youtube.com/watch?v=${
              videos.data.results[0].key
            }`
          });
        }
      });
  };

  render() {
    const { movie } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <Navigation query={this.props.match.params.query} />
          <main
            className="col-md-9 ml-sm-auto col-lg-10 p-3 p-md-4 p-lg-5"
            style={{ height: "calc(100vh - 62px)", overflow: "scroll" }}
          >
            <div className="movie-card">
              <div className="row mb-3">
                <div className="col-4 col-md-3">
                  <a
                    data-fancybox
                    href={`https://image.tmdb.org/t/p/original${
                      movie.posterPath
                    }`}
                  >
                    <img
                      className="w-100"
                      src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                      alt={movie.title}
                    />
                  </a>
                </div>
                <div className="col-8 col-md-9">
                  <h2 className="movie-title">
                    {movie.title}
                    <span className="text-white-50 ml-3 d-none d-md-inline-block">
                      ({new Date(movie.releaseDate).getFullYear()})
                    </span>
                  </h2>
                  {!this.props.loadingMovie && (
                    <div>
                      {console.log("rating", Number(movie.voteAverage) || 0)}
                      <span className="badge badge-danger mr-2">
                        {movie.voteAverage}
                      </span>
                      <StarRatings
                        rating={Number(movie.voteAverage / 2) || 0}
                        starRatedColor="orange"
                        starDimension="24px"
                        starSpacing="5"
                        numberOfStars={5}
                        name="rating"
                      />
                    </div>
                  )}
                  <span className="text-white-50 d-block d-md-none mt-2">
                    {movie.releaseDate}
                  </span>
                  <div className="my-3">
                    {!this.props.isAuth > 0 ? (
                      <Link to="/login" className="btn btn-danger mr-3">
                        <i className="far fa-heart" />
                      </Link>
                    ) : (
                      <button
                        className="btn btn-danger mr-3"
                        onClick={() =>
                          !this.props.favorite
                            ? this.props.addToList(
                                "favorite",
                                movie.movieId,
                                this.props.userId
                              )
                            : this.props.removeFromList(
                                "favorite",
                                movie.movieId,
                                this.props.userId
                              )
                        }
                      >
                        {this.props.favorite ? (
                          <i className="fas fa-heart" />
                        ) : (
                          <i className="far fa-heart" />
                        )}
                      </button>
                    )}

                    {!this.props.isAuth > 0 ? (
                      <Link to="/login" className="btn btn-danger mr-3">
                        <i className="far fa-clock" />
                      </Link>
                    ) : (
                      <button
                        className="btn btn-danger mr-3"
                        onClick={() =>
                          !this.props.watchLater
                            ? this.props.addToList(
                                "later",
                                movie.movieId,
                                this.props.userId
                              )
                            : this.props.removeFromList(
                                "later",
                                movie.movieId,
                                this.props.userId
                              )
                        }
                      >
                        {this.props.watchLater ? (
                          <i className="fas fa-clock" />
                        ) : (
                          <i className="far fa-clock" />
                        )}
                      </button>
                    )}
                    {this.state.trailer && (
                      <a
                        href={this.state.trailer}
                        data-fancybox
                        className="btn btn-outline-light"
                      >
                        <i className="far fa-play-circle" /> Watch Trailer
                      </a>
                    )}
                  </div>
                  <div className="d-none d-sm-block">
                    <h5 className="pt-3">Overview</h5>
                    <p className="text-white-50">{movie.overview}</p>
                    <hr />
                    <p className="text-white-50">
                      <strong className="text-white">Genres: </strong>
                      {movie.genres}
                    </p>
                    <hr />
                    <p className="text-white-50">
                      <strong className="text-white">Duration: </strong>
                      {movie.length} minutes
                    </p>
                  </div>
                </div>
                <div className="col-12 d-block d-sm-none">
                  <hr />
                  <p className="text-white-50">
                    <strong className="text-white">Duration: </strong>
                    {movie.length} minutes
                  </p>
                  <hr />
                  <strong className="pt-3">Genres</strong>
                  <br />
                  <p className="text-white-50">{movie.genres}</p>
                  <hr />
                  <strong className="pt-3">Overview</strong>
                  <br />
                  <p className="text-white-50">{movie.overview}</p>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12">
                  <MovieTabs
                    actors={this.props.actors}
                    removeComment={this.removeComment}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: !!state.user.token,
    userId: state.user.userId,
    movie: state.movie.movie,
    loadingMovie: state.movie.loadingMovie,
    actors: state.movie.actors,
    favorite: state.movie.favorite,
    watchLater: state.movie.watchLater
  };
};

export default connect(
  mapStateToProps,
  { fetchMovie, addToList, removeFromList }
)(Movie);
