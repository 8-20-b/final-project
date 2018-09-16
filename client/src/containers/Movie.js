import React, { Component } from "react";
import axios from "axios";

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
      .then(res => this.setState({ movie: res.data }));
  };

  render() {
    console.log("state", this.state.movie);
    const { movie } = this.state;
    return (
      <div className="container">
        <h1>Results page</h1>
        <div className="row">
          <div className="col-md-9 mx-auto">
            <div className="results-list">
              <div className="movie-item">
                <div className="row mb-3">
                  <div className="col-md-3">
                    <img
                      className="img-fluid"
                      src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${
                        movie.poster_path
                      }`}
                      alt={movie.title}
                    />
                  </div>
                  <div className="col-md-9">
                    <h2>{movie.title}</h2>
                    <small className="text-muted">{movie.release_date}</small>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
