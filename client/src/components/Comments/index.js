import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchComments, addComment } from "../../actions/comment";
import Comment from "./Comment";
import AddComment from "../Forms/AddComment";

class Comments extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    movieId: PropTypes.number,
    comments: PropTypes.array.isRequired
  };

  state = {
    formOpen: false,
    fetchFired: false
  };

  componentWillReceiveProps = nextProps => {
    if (!this.state.fetchFired) {
      this.props.fetchComments(nextProps.movieId);
      this.setState({ fetchFired: true });
    }
  };

  onSubmit = comment => {
    const { movieId, userId } = this.props;
    this.props.addComment(comment, movieId, userId);
    this.setState({ fetchFired: false });
  };

  // onUpdateComment = (comment, commentId) => {
  //   this.props.updateComment(comment, commentId);
  //   this.setState({ fetchFired: false });
  // };

  render() {
    return (
      <div className="">
        <div className="text-right mb-3">
          {this.props.userId > 0 ? (
            <button
              onClick={() => this.setState({ formOpen: !this.state.formOpen })}
              className="btn btn-danger  mb-3"
            >
              {this.state.formOpen ? "Cancel" : "Add Comment"}
            </button>
          ) : (
            <Link to="/login" className="btn btn-danger  mb-3">
              Add comment
            </Link>
          )}
          {this.state.formOpen && <AddComment onSubmit={this.onSubmit} />}
        </div>
        {this.props.comments.length > 0 ? (
          this.props.comments.map((comment, key) => (
            <Comment key={key} comment={comment} />
          ))
        ) : (
          <div className="alert alert-warning">
            There are no comments for this movie yet.
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    movieId: state.movie.movie.movieId,
    comments: state.comment.comments
  };
};

export default connect(
  mapStateToProps,
  { fetchComments, addComment }
)(Comments);
