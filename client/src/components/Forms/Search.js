import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    search: "scarface"
  };

  componentDidMount = () => {};

  render() {
    return (
      <form className="form-inline mt-2 mt-md-0">
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          onChange={e => this.setState({ search: e.target.value })}
          value={this.state.search}
        />
        <Link
          to={`/results/${this.state.search}`}
          className="btn btn-outline-success my-2 my-sm-0"
        >
          Search
        </Link>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.movie
  };
};

export default connect(mapStateToProps)(Search);
