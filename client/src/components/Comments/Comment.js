import React, { Component } from "react";
import { updateComment, removeComment } from "../../actions/comment";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";

class Comment extends Component {
  state = {
    isEditing: false,
    comment: ""
  };

  componentDidMount = () => {
    this.setState({ comment: this.props.comment.comment });
  };

  handleUpdate = commentId => {
    if (this.state.isEditing) {
      this.props.updateComment(this.state.comment, commentId);
    }
    this.setState({ isEditing: !this.state.isEditing });
  };

  render() {
    const { comment, userId } = this.props;
    return (
      <div className="bg-dark p-4 rounded mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              src={comment.profile ? comment.profile : "/images/profile.png"}
              alt={`${comment.firstName} ${comment.lastName}`}
              className="d-block w-100 rounded-circle p-5 p-md-4"
            />
          </div>
          <div className="col-md-10 text-center text-md-left">
            <h2>
              {comment.firstName} {comment.lastName}
            </h2>
            <time className="text-white-50">
              <TimeAgo date={comment.createdAt} />
            </time>

            <p className="text-muted">
              {this.state.isEditing ? (
                <textarea
                  className="form-control"
                  onChange={e => this.setState({ comment: e.target.value })}
                  value={this.state.comment}
                />
              ) : (
                comment.comment
              )}
            </p>
            {userId === comment.userId && (
              <div className="text-center text-md-right">
                <button
                  className="btn btn-success mr-2"
                  onClick={() => this.handleUpdate(comment.commentId)}
                >
                  {this.state.isEditing ? "Save" : "Edit"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => this.props.removeComment(comment.commentId)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
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

export default connect(
  mapStateToProps,
  { updateComment, removeComment }
)(Comment);
