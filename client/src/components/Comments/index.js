import React, { Component } from "react";
import Comment from "./Comment";
import AddComment from "../Forms/AddComment";

class Comments extends Component {
  state = {
    formOpen: false
  };
  render() {
    const { dataSource, addComment, removeComment } = this.props;

    return (
      <div className="">
        <div className="text-right mb-3">
          <button
            onClick={() => this.setState({ formOpen: !this.state.formOpen })}
            className="btn btn-danger  mb-3"
          >
            {this.state.formOpen ? "Cancel" : "Add Comment"}
          </button>
          {this.state.formOpen && <AddComment onSubmit={addComment} />}
        </div>
        {dataSource.map((comment, key) => (
          <Comment key={key} comment={comment} onDelete={removeComment} />
        ))}
      </div>
    );
  }
}

export default Comments;
