import React from "react";

const Comment = ({ comment }) => {
  const date = new Date(comment.date);
  return (
    <div className="bg-dark p-4 rounded mb-3">
      <div className="row">
        <div className="col-2">
          <img
            src={comment.profile}
            alt={comment.name}
            className="d-block w-100 rounded-circle p-4"
          />
        </div>
        <div className="col-10">
          <h2>{comment.name}</h2>
          <time className="text-white-50">{date.toLocaleString()}</time>
          <p className="text-muted">{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
