import { FETCH_MOVIES, LOADING_MOVIES } from "./types";
import api from "../services/movie";

export const fetchedMovies = movies => {
  return {
    type: FETCH_MOVIES,
    payload: movies
  };
};

export const loadingMovies = bool => {
  return {
    type: LOADING_MOVIES,
    payload: bool
  };
};

export const fetchMovies = (query, userId) => dispatch => {
  dispatch(loadingMovies(true));
  api.movie.getMovies(query, userId).then(movies => {
    dispatch(fetchedMovies(movies));
    dispatch(loadingMovies(false));
  });
};
