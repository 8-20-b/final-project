import React from "react";

const Comments = ({ dataSource }) => (
  <div class="">
    {dataSource.map(comment => (
      <Comment data={comment} />
    ))}
  </div>
);

export default Comments;
