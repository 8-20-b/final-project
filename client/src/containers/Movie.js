import React, { Component } from "react";
import axios from "axios";
import { API_ROOT } from "../services/api-config";
import Navigation from "../components/Navigation";

export default class Movie extends Component {
  state = {
    movie: {}
  };
  componentDidMount = () => {
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
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
