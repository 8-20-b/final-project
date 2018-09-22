const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const Movie = require("../models").Movie;
const Genre = require("../models").Genre;
const List = require("../models").List;

const getAll = (req, res) => {
  //console.log("query:", req.query.query);

  const where = {};
  let order = [];
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
  }
  Movie.findAll({
    where,
    limit: 10,
    order
  }).then(movies => res.json(movies));
};

const getOne = (req, res) => {
  Movie.findOne({
    where: { movieId: req.params.id },
    include: [{ model: List }]
  }).then(movie => {
    if (movie) {
      res.json(movie);
    } else {
      res.json({ success: false, message: "No movies found with that ID." });
    }
  });
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

const addToList = (req, res) => {
  const { type, movieId, userId } = req.body;
  List.create({ type, movieId, userId })
    .then(data => res.json({ success: true, data }))
    .catch(() => res.json({ success: false }));
};

const removeFromList = (req, res) => {
  const { movieId, userId } = req.body;
  List.destroy({ where: { movieId, userId } })
    .then(data => res.json({ success: true, data }))
    .catch(() => res.json({ success: false }));
};

module.exports = { create, getAll, getOne, addToList, removeFromList };
