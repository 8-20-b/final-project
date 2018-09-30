import React from "react";
import CommentsList from "../Comments";
import ActorsList from "../Actors";

export default () => {
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
          <CommentsList />
        </div>
        <div
          className="tab-pane fade show active pt-4"
          id="actors"
          role="tabpanel"
        >
          <ActorsList />
        </div>
      </div>
    </div>
  );
};
