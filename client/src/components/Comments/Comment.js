import React from "react";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";

const Comment = ({ comment, onDelete, userId }) => {
  return (
    <div className="bg-dark p-4 rounded mb-3">
      <div className="row">
        <div className="col-2">
          <img
            src={comment.profile ? comment.profile : "/images/profile.png"}
            alt={`${comment.firstName} ${comment.lastName}`}
            className="d-block w-100 rounded-circle p-4"
          />
        </div>
        <div className="col-10">
          <h2>
            {comment.firstName} {comment.lastName}
          </h2>
          <time className="text-white-50">
            <TimeAgo date={comment.createdAt} />
          </time>
          <p className="text-muted">{comment.comment}</p>
          <div className="text-right">
            {userId === comment.userId && (
              <button
                className="btn btn-danger"
                onClick={() => onDelete(comment.commentId)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  };
};

export default connect(mapStateToProps)(Comment);
