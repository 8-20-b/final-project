import React from "react";
import { Link } from "react-router-dom";

export default ({ movie }) => (
  <Link to={`/movie/${movie.movieId}`}>
    <figure>
      <img
        className="d-block w-100 rounded"
        src={`http://image.tmdb.org/t/p/w300/${movie.posterPath}`}
        alt={movie.title}
      />
      <figcaption>
        <h5 className="text-white">{movie.title}</h5>
      </figcaption>
    </figure>
  </Link>
);
