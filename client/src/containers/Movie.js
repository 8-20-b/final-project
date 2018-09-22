import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { API_ROOT } from "../services/api-config";
import Navigation from "../components/Navigation";
import MovieTabs from "../components/MovieTabs";

class Movie extends Component {
  state = {
    movie: {},
    favorite: false,
    later: false,
    comments: [
      {
        commentId: 1,
        date: "2018-09-19 00:00:00",
        profile: "https://avatars2.githubusercontent.com/u/15160756?s=460&v=4",
        name: "Dioni M.",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, delectus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae consequuntur vel accusamus explicabo, ipsum id."
      },
      {
        commentId: 1,
        date: "2018-09-20 00:00:00",
        profile: "https://avatars1.githubusercontent.com/u/31051973?s=460&v=4",
        name: "Lisa E.",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, delectus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae consequuntur vel accusamus explicabo, ipsum id."
      },
      {
        commentId: 1,
        date: "2018-09-21 00:00:00",
        profile: "https://avatars1.githubusercontent.com/u/36522327?s=460&v=4",
        name: "Charsta Scott.",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, delectus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae consequuntur vel accusamus explicabo, ipsum id."
      }
    ],
    cast: []
  };

  componentDidMount = () => {
    this.searchMovie();
    this.searchCast();
  };

  searchMovie = () => {
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
  searchCast = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.movie_id
        }/credits?api_key=b8579c1fd967de5bf38fd125a1b4b0bc`
      )
      .then(credits => this.setState({ cast: credits.data.cast }));
  };

  addToList = (type, movieId, userId) => {
    axios
      .post(`${API_ROOT}/movies/list`, { type, movieId, userId })
      .then(res => {
        res.data.success && this.setState({ [type]: true });
      })
      .catch(() => console.log("Something went wrong."));
  };

  render() {
    const { movie } = this.state;
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
            <div className="movie-card">
              <div className="row mb-3">
                <div className="col-md-3">
                  <img
                    className="img-fluid"
                    src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                    alt={movie.title}
                  />
                </div>
                <div className="col-md-9">
                  <h2>
                    {movie.title}
                    <span className="text-white-50 ml-3">
                      ({new Date(movie.releaseDate).getFullYear()})
                    </span>
                  </h2>
                  <div className="my-3">
                    <button
                      className="btn btn-danger mr-3"
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
                    <button
                      className="btn btn-danger mr-3"
                      onClick={() =>
                        this.addToList(
                          "later",
                          movie.movieId,
                          this.props.userId
                        )
                      }
                    >
                      {this.state.favorite ? (
                        <i className="fas fa-clock" />
                      ) : (
                        <i className="far fa-clock" />
                      )}
                    </button>
                    <button className="btn btn-outline-danger">
                      <i className="far fa-play-circle" /> Watch Trailer
                    </button>
                  </div>
                  <h4 className="pt-3">Overview</h4>
                  <p className="text-white-50">{movie.overview}</p>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12">
                  <MovieTabs
                    actors={this.state.cast}
                    comments={this.state.comments}
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
  console.log("redux", state);
  return {
    userId: state.user.userId
  };
};

export default connect(mapStateToProps)(Movie);
