const Movie = require("../models").Movie;
const Genre = require("../models").Genre;
const Cast = require("../models").Cast;

const getAll = (req, res) => {
  Movie.findAll().then(movies => res.json(movies));
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
