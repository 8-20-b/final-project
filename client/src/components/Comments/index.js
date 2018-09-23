import React from "react";
import Comment from "./Comment";

const Comments = ({ dataSource }) => (
  <div className="">
    {dataSource.map((comment, key) => (
      <Comment key={key} comment={comment} />
    ))}
  </div>
);

export default Comments;
