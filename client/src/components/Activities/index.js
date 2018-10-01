import React, { Component } from "react";
import axios from "axios";
import { API_ROOT } from "../../services/api-config";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

export default class Activities extends Component {
  state = {
    activities: []
  };

  componentDidMount = () => {
    axios.get(`${API_ROOT}/activities`).then(activities => {
      if (activities.data.success) {
        this.setState({ activities: activities.data.results });
      }
    });
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
                    src={
                      activity.profile
                        ? activity.profile
                        : "/images/profile.png"
                    }
                    alt={`${activity.firstName} ${activity.lastName}`}
                  />
                </div>
                <strong className="text-white">
                  {activity.firstName ? activity.firstName : "Unknown"}{" "}
                  {activity.lastName && activity.lastName.substr(0, 1)}
                </strong>
                {activity.action}
                <br />
                <Link to={`/movie/${activity.movieId}`} className="text-danger">
                  {activity.title}
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
