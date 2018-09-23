import React from "react";
import TimeAgo from "react-timeago";

const Comment = ({ comment }) => {
  return (
    <div className="bg-dark p-4 rounded mb-3">
      <div className="row">
        <div className="col-2">
          <img
            src={comment.profile ? comment.profile : "/images/profile.png"}
            alt={`${comment.User.firstName} ${comment.User.lastName}`}
            className="d-block w-100 rounded-circle p-4"
          />
        </div>
        <div className="col-10">
          <h2>
            {comment.User.firstName} {comment.User.lastName}
          </h2>
          <time className="text-white-50">
            <TimeAgo date={comment.createdAt} />
          </time>
          <p className="text-muted">{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
