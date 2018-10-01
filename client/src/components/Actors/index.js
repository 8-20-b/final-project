import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchActors } from "../../actions/movie";
import { connect } from "react-redux";
import Placeholder from "../Placeholder";

export class Actors extends Component {
  static propTypes = {
    fetchActors: PropTypes.func.isRequired,
    actors: PropTypes.array.isRequired,
    movieId: PropTypes.number
  };

  state = {
    fetchFired: false
  };

  componentWillReceiveProps = nextProps => {
    if (!this.state.fetchFired) {
      this.props.fetchActors(nextProps.movieId);
      this.setState({ fetchFired: true });
    }
  };

  render() {
    return (
      <div className="row">
        {this.props.actors.slice(0, 6).map(actor => (
          <div key={actor.cast_id} className="col-4 col-sm-3 col-md-3 col-lg-2">
            <a
              className=""
              data-fancybox
              href={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
            >
              {actor.profile_path ? (
                <img
                  className="img-fluid mb-3 mb-md-1"
                  src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <Placeholder />
              )}
            </a>
            <h5 className="d-none d-md-block">{actor.name}</h5>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movieId: state.movie.movie.movieId,
    actors: state.movie.actors
  };
};

export default connect(
  mapStateToProps,
  { fetchActors }
)(Actors);
