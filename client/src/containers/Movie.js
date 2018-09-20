import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { API_ROOT } from "../services/api-config";
import Navigation from "../components/Navigation";

class Movie extends Component {
  state = {
    movie: {},
    favorite: false,
    later: false
  };

  componentDidMount = () => {
    //this.fetchMovie();
    this.searchMovies();
  };

  searchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.movie_id
        }?api_key=b8579c1fd967de5bf38fd125a1b4b0bc`
      )
      .then(res =>
        axios
          .post(`${API_ROOT}/movies`, res.data)
          .then(movie => this.setState({ movie: movie.data }))
      );
  };

  addToList = (type, movieId, userId) => {
    axios
      .post(`${API_ROOT}/movies/list`, { type, movieId, userId })
      .then(res => {
        res.data.success && this.setState({ [type]: true });
      })
      .catch(() => console.log("Something went wrong."));
  };

  fetchMovie = () => {
    axios
      .get(`${API_ROOT}/movies/${this.props.match.params.movie_id}`)
      .then(movie => {
        this.setState({ movie });
      });
  };

  render() {
    const { movie } = this.state;
    console.log("movie", movie);
    return (
      <div className="container-fluid">
        <div className="row">
          <Navigation query={this.props.match.params.query} />
          <main
            className="col-md-9 ml-sm-auto col-lg-10 pt-5 px-5"
            style={{ height: "calc(100vh - 62px)" }}
          >
            <div
              style={{
                background: `url(https://image.tmdb.org/t/p/original/${
                  movie.backdropPath
                }) center center no-repeat`,
                opacity: 0.1
              }}
              className="h-100 position-absolute"
            />
            <div className="movie-card row">
              <div className="row mb-3">
                <div className="col-md-3">
                  <img
                    className="img-fluid"
                    src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                    alt={movie.title}
                  />
                </div>
                <div className="col-md-9">
                  <h2>{movie.title}</h2>
                  <small className="text-muted">{movie.releaseDate}</small>
                  <p>{movie.overview}</p>
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        this.addToList(
                          "favorite",
                          movie.movieId,
                          this.props.userId
                        )
                      }
                    >
                      {this.state.favorite ? (
                        <i className="fas fa-heart" />
                      ) : (
                        <i className="far fa-heart" />
                      )}
                    </button>
                  </div>
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
  console.log("redux", state);
  return {
    userId: state.user.userId
  };
};

export default connect(mapStateToProps)(Movie);
