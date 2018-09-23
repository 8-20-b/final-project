import React, { Component } from "react";
import { connect } from "react-redux";
// import movieTrailer from "movie-trailer";
import axios from "axios";
import { API_ROOT } from "../services/api-config";
import Navigation from "../components/Navigation";
import MovieTabs from "../components/MovieTabs";

class Movie extends Component {
  state = {
    movie: {},
    trailer: "",
    favorite: false,
    later: false,
    comments: [],
    cast: []
  };

  componentDidMount = () => {
    this.searchMovie();
    this.searchCast();
    this.searchTrailer();
    this.fetchComments();
  };

  searchMovie = () => {
    axios
      .get(
        `${API_ROOT}/movies/${this.props.match.params.movie_id}?userId=${
          this.props.userId
        }`
      )
      .then(({ data: movie }) => {
        if (movie.success) {
          let lists = {};
          movie.result.Lists.map(list => {
            if (list.type === "favorite") {
              lists.favorite = true;
            }
            if (list.type === "later") {
              lists.later = true;
            }

            return lists;
          });

          const { later, favorite } = lists;

          this.setState({
            movie: movie.result,
            favorite,
            later
          });
        } else {
          axios
            .get(
              `https://api.themoviedb.org/3/movie/${
                this.props.match.params.movie_id
              }?api_key=b8579c1fd967de5bf38fd125a1b4b0bc`
            )
            .then(res =>
              axios
                .post(`${API_ROOT}/movies`, res.data)
                .then(({ data: createdMovie }) =>
                  this.setState({ movie: createdMovie })
                )
            );
        }
      })
      .catch(err => console.log("Error", err));
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

  searchTrailer = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.movie_id
        }/videos?api_key=b8579c1fd967de5bf38fd125a1b4b0bc`
      )
      .then(videos =>
        this.setState({
          trailer: `https://www.youtube.com/watch?v=${
            videos.data.results[0].key
          }`
        })
      );
  };

  addToList = (type, movieId, userId) => {
    axios
      .post(`${API_ROOT}/movies/list`, { type, movieId, userId })
      .then(res => {
        res.data.success && this.setState({ [type]: !this.state[type] });
      })
      .catch(() => console.log("Something went wrong."));
  };

  removeFromList = (type, movieId, userId) => {
    axios
      .delete(
        `${API_ROOT}/movies/list?type=${type}&movieId=${movieId}&userId=${userId}`
      )
      .then(res => {
        res.data.success && this.setState({ [type]: !this.state[type] });
      })
      .catch(() => console.log("Something went wrong."));
  };

  fetchComments = () => {
    axios
      .get(`${API_ROOT}/comments/${this.props.match.params.movie_id}`)
      .then(({ data: comments }) => this.setState({ comments }));
  };

  addComment = ({ comment }) => {
    axios
      .post(`${API_ROOT}/comments`, {
        comment,
        movieId: this.props.match.params.movie_id,
        userId: this.props.userId
      })
      .then(
        ({ data: newComment }) => newComment.success && this.fetchComments()
      );
  };

  removeComment = commentId => {
    axios
      .delete(`${API_ROOT}/comments/${commentId}`)
      .then(({ data: comment }) => comment.success && this.fetchComments());
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
                        !this.state.favorite
                          ? this.addToList(
                              "favorite",
                              movie.movieId,
                              this.props.userId
                            )
                          : this.removeFromList(
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
                        !this.state.later
                          ? this.addToList(
                              "later",
                              movie.movieId,
                              this.props.userId
                            )
                          : this.removeFromList(
                              "later",
                              movie.movieId,
                              this.props.userId
                            )
                      }
                    >
                      {this.state.later ? (
                        <i className="fas fa-clock" />
                      ) : (
                        <i className="far fa-clock" />
                      )}
                    </button>
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
                  <h5 className="pt-3">Overview</h5>
                  <p className="text-white-50">{movie.overview}</p>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12">
                  <MovieTabs
                    actors={this.state.cast}
                    comments={this.state.comments}
                    addComment={this.addComment}
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
  //console.log("redux", state);
  return {
    userId: state.user.userId
  };
};

export default connect(mapStateToProps)(Movie);
