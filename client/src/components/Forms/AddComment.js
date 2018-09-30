import React, { Component } from "react";

export default class AddComment extends Component {
  state = {
    comment: "",
    errors: {}
  };

  componentDidMount = () => {};

  validate = comment => {
    let errors = {};

    if (!comment) errors.comment = "You must enter a comment.";

    return errors;
  };

  render() {
    return (
      <form>
        {!!this.state.errors.comment && (
          <div className="alert alert-danger text-center">
            {this.state.errors.comment}
          </div>
        )}
        <div className="form-group">
          <textarea
            className="form-control"
            name="comment"
            onChange={e =>
              this.setState({ comment: e.target.value, errors: {} })
            }
            placeholder="Enter your comment here..."
            value={this.state.comment}
          />
        </div>
        <button
          onClick={e => {
            e.preventDefault();
            const errors = this.validate(this.state.comment);

            Object.keys(errors).length < 1
              ? this.props.onSubmit(this.state.comment)
              : this.setState({ errors });
          }}
          className="mt-4 btn btn-danger"
        >
          Submit
        </button>
      </form>
    );
  }
}
