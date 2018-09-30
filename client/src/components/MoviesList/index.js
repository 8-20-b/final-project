import React from "react";
import MovieCard from "../Movie";

const MoviesList = ({ movies }) => (
  <div className="row">
    {movies.map(movie => (
      <div key={movie.movieId} className="col-6 col-sm-4 col-md-3 col-lg-2">
        <MovieCard movie={movie} />
      </div>
    ))}
  </div>
);

export default MoviesList;
