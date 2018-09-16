import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Results extends Component {
  state = {
    results: []
  };
  componentDidMount = () => {
    this.searchMovies();
  };

  searchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${
          this.props.match.params.query
        }&api_key=b8579c1fd967de5bf38fd125a1b4b0bc`
      )
      .then(res => this.setState({ results: res.data.results }));
  };

  render() {
    console.log("state", this.state.results);
    return (
      <div className="container">
        <h1>Results page</h1>
        <div className="row">
          <div className="col-md-9 mx-auto">
            <div className="results-list">
              {this.state.results.map(res => (
                <Link
                  to={`/movie/${res.id}`}
                  key={res.id}
                  className="result-item"
                >
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <img
                        className="img-fluid"
                        src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${
                          res.poster_path
                        }`}
                        alt={res.title}
                      />
                    </div>
                    <div className="col-md-9">
                      <h2>{res.title}</h2>
                      <small className="text-muted">{res.release_date}</small>
                      <p>{res.overview}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
