import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Search extends Component {
  state = {
    search: ""
  };

  onSearch = e => {
    e.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie/?query=${
          this.state.search
        }&api_key=b8579c1fd967de5bf38fd125a1b4b0bc`
      )
      .then(res => console.log("results", res.data));
  };

  render() {
    return (
      <form className="form-inline mt-2 mt-md-0" _lpchecked="1">
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          onChange={e => this.setState({ search: e.target.value })}
          value={this.state.search}
        />
        <button
          onClick={this.onSearch}
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
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
