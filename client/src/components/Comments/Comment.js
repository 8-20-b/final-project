import React from "react";

const Comment = ({ comment }) => (
  <div class="row">
    <div class="col-2">
      <img
        src={comment.profile}
        alt={comment.name}
        className="d-block w-100 rounded-circle"
      />
    </div>
    <div className="col-10">
      <h2>{comment.name}</h2>
      <p>{comment.comment}</p>
    </div>
  </div>
);

export default Comment;
