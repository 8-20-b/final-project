import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { API_ROOT } from "../services/api-config";
import Navigation from "../components/Navigation";
import MoviesList from "../components/MoviesList";

class Movies extends Component {
  state = {
    movies: []
  };

  componentDidMount = () => {
    axios
      .get(
        `${API_ROOT}/movies?query=${this.props.match.params.query}&userId=${
          this.props.userId
        }`
      )
      .then(({ data: movies }) => this.setState({ movies }));
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
            <MoviesList movies={this.state.movies} />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  };
};

export default connect(mapStateToProps)(Movies);
