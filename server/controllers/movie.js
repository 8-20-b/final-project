const Op = require("sequelize").Op;

const Movie = require("../models").Movie;
const Genre = require("../models").Genre;
const Cast = require("../models").Cast;

const getAll = (req, res) => {
  console.log("query:", req.query.query);

  const where = {};
  if (req.query.query === "new-releases") {
    console.log("it works");
    where.releaseDate = {
      [Op.lt]: new Date(),
      [Op.gt]: new Date(new Date() - 90 * 24 * 60 * 60 * 1000)
    };
  } else if (req.query.query === "upcoming") {
    where.releaseDate = {
      [Op.gt]: new Date()
    };
  }

  Movie.findAll({
    where,
    limit: 10,
    order: [["releaseDate", "DESC"]]
  }).then(movies => res.json(movies));
};

const create = (req, res) => {
  const {
    id,
    backdrop_path,
    poster_path,
    overview,
    release_date,
    runtime,
    title,
    vote_average,
    vote_count,
    genres
  } = req.body;

  const newMovie = {
    movieId: id,
    backdropPath: backdrop_path,
    posterPath: poster_path,
    overview,
    releaseDate: release_date,
    length: runtime,
    title,
    userRating: vote_average,
    voteCount: vote_count,
    Genres: genres
  };

  Movie.findOne({ where: { movieId: id } }).then(movie => {
    if (movie) {
      res.json(movie);
    } else {
      Movie.create(newMovie, {
        includes: [Genre]
      }).then(createdMovie => res.json(createdMovie));
    }
  });
};

module.exports = { create, getAll };
