import React, { Component } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

export default class Activities extends Component {
  state = {
    activities: [
      {
        activityId: 1,
        date: "2018-09-22 21:00:00",
        profile: "https://avatars2.githubusercontent.com/u/15160756?s=460&v=4",
        name: "Dioni M."
      },
      {
        activityId: 1,
        date: "2018-09-20 00:00:00",
        profile: "https://avatars1.githubusercontent.com/u/31051973?s=460&v=4",
        name: "Lisa E."
      },
      {
        activityId: 1,
        date: "2018-09-19 00:00:00",
        profile: "https://avatars1.githubusercontent.com/u/36522327?s=460&v=4",
        name: "Charsta Scott"
      }
    ]
  };
  render() {
    return (
      <div style={{ fontSize: "0.8rem" }}>
        <ul className="nav flex-column mb-2">
          {this.state.activities.map((activity, key) => (
            <li key={key} className="nav-item">
              <div className="nav-link">
                <div className="float-left pb-5 mr-2">
                  <img
                    className=" rounded-circle"
                    height="35"
                    src={activity.profile}
                    alt={activity.name}
                  />
                </div>
                <strong>{activity.name}</strong> has liked
                <br />
                <Link to={`/movies/123`} className="text-danger">
                  Jurassic World
                </Link>
                <br />
                <TimeAgo date={activity.date} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
