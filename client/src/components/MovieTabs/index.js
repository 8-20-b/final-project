import React from "react";
import CommentsList from "../Comments";

export default ({ actors, comments, addComment, removeComment }) => {
  return (
    <div>
      <ul className="nav nav-tabs" id="movieTabs" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="actors-tab"
            data-toggle="tab"
            href="#actors"
          >
            Actors
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link "
            id="comments-tab"
            data-toggle="tab"
            href="#comments"
          >
            Comments
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade pt-4" id="comments" role="tabpanel">
          <CommentsList
            addComment={addComment}
            removeComment={removeComment}
            dataSource={comments}
          />
        </div>
        <div
          className="tab-pane fade show active pt-4"
          id="actors"
          role="tabpanel"
        >
          <div className="row">
            {actors.slice(0, 6).map(actor => (
              <div key={actor.cast_id} className="col-md-2">
                <img
                  className="img-fluid"
                  src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
                  alt={actor.name}
                />
                <h5>{actor.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
