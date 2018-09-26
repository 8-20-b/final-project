const axios = require("axios");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const Movie = require("../models").Movie;
const List = require("../models").List;

const getAll = (req, res) => {
  const where = {};
  let order = [];
  let include = [];

  if (req.query.query === "new-releases") {
    where.releaseDate = {
      [Op.lt]: new Date(),
      [Op.gt]: new Date(new Date() - 90 * 24 * 60 * 60 * 1000)
    };
    order = [["releaseDate", "DESC"]];
  } else if (req.query.query === "upcoming") {
    where.releaseDate = {
      [Op.gt]: new Date()
    };
    order = [["releaseDate", "ASC"]];
  } else if (req.query.query === "favorites") {
    include = [
      {
        model: List,
        where: { type: "favorite", userId: req.query.userId }
      }
    ];
  } else if (req.query.query === "watch-later") {
    include = [
      {
        model: List,
        where: { type: "later", userId: req.query.userId }
      }
    ];
  } else {
    order = [["createdAt", "DESC"]];
  }

  Movie.findAll({
    where,
    limit: 24,
    order,
    include
  })
    .then(movies => res.json({ success: true, results: movies }))
    .catch(err =>
      res.json({ success: false, message: "Something went wrong:", err })
    );
};

const create = (req, res) => {
  let include = [];
  if (req.query.userId)
    include = [
      {
        model: List,
        where: { movieId: req.query.movieId, userId: req.query.userId },
        paranoid: false,
        required: false
      }
    ];

  Movie.findOne({ where: { movieId: req.query.movieId }, include }).then(
    movie => {
      if (movie) {
        res.json({ success: true, result: movie });
      } else {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${req.query.movieId}?api_key=${
              process.env.IMDB_KEY
            }`
          )
          .then(({ data: imdb }) => {
            console.log("IMDB:", imdb);
            const newMovie = {
              movieId: req.query.movieId,
              backdropPath: imdb.backdrop_path,
              posterPath: imdb.poster_path,
              overview: imdb.overview,
              releaseDate: imdb.release_date,
              length: imdb.runtime,
              title: imdb.title,
              userRating: imdb.vote_average,
              voteCount: imdb.vote_count
              // Genres: imdb.genres
            };

            Movie.create(newMovie).then(createdMovie =>
              res.json({ success: true, result: createdMovie })
            );
          });
      }
    }
  );
};

const addToList = (req, res) => {
  const { type, movieId, userId } = req.body;
  List.findOne({ where: { type, movieId, userId } }).then(list => {
    if (!list) {
      List.create({ type, movieId, userId })
        .then(() => res.json({ success: true }))
        .catch(() => res.json({ success: false }));
    } else {
      res.json({ success: true });
    }
  });
};

const removeFromList = (req, res) => {
  const { type, movieId, userId } = req.query;
  List.destroy({ where: { type, movieId, userId } })
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }));
};

module.exports = {
  create,
  getAll,
  addToList,
  removeFromList
};
