import React, { Component } from "react";

export default class AddComment extends Component {
  state = {
    comment: "",
    movieId: null,
    userId: null,
    errors: {}
  };

  componentDidMount = () => {};



  render() {
    return (
      <form>
        {!!this.state.errors.global && (
          <div className="alert alert-danger">{this.state.errors.global}</div>
        )}
        <div className="form-group">
          <textarea
            className="form-control"
            name="comment"
            onChange={e => this.setState({ comment: e.target.value })}
            placeholder="Enter your comment here..."
            value={this.state.comment}
          />
          {this.state.errors.comment && (
            <small className="text-danger">{this.state.errors.comment}</small>
          )}
        </div>
        <button onClick={this.onSubmit} className="mt-4 btn btn-danger">
          Submit
        </button>
      </form>
    );
  }
}
