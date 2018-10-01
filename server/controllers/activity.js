const Activity = require("../models").Activity;
const User = require("../models").User;
const Movie = require("../models").Movie;

const getAll = (req, res) => {
  Activity.findAll({
    order: [["createdAt", "DESC"]],
    limit: 3,
    include: [{ model: User }, { model: Movie }]
  })
    .then(activities => {
      const output = activities.map(activity => {
        //tidy up the user data
        return Object.assign(
          {},
          {
            userId: activity.User.userId,
            firstName: activity.User.firstName,
            lastName: activity.User.lastName,
            profile: activity.User.profilePic,
            action: activity.action,
            movieId: activity.Movie.movieId,
            title: activity.Movie.title,
            date: activity.createdAt
          }
        );
      });
      res.json({ success: true, results: output });
    })
    .catch(err => res.json({ success: false, message: err }));
};

module.exports = { getAll };
