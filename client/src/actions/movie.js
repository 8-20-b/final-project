import {
  FETCH_MOVIES,
  LOADING_MOVIES,
  FETCH_MOVIE,
  LOADING_MOVIE,
  FAVORITE,
  WATCH_LATER
} from "./types";
import api from "../services/movie";

export const fetchedMovies = movies => {
  return {
    type: FETCH_MOVIES,
    payload: movies
  };
};

export const fetchedMovie = movie => {
  return {
    type: FETCH_MOVIE,
    payload: movie
  };
};

export const loadingMovies = bool => {
  return {
    type: LOADING_MOVIES,
    payload: bool
  };
};

export const loadingMovie = bool => {
  return {
    type: LOADING_MOVIE,
    payload: bool
  };
};

export const favorite = bool => {
  return {
    type: FAVORITE,
    payload: bool
  };
};

export const watchLater = bool => {
  return {
    type: WATCH_LATER,
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

export const fetchMovie = (movieId, userId) => dispatch => {
  dispatch(loadingMovie(true));
  api.movie.getMovie(movieId, userId).then(movie => {
    for (let list of movie.Lists) {
      if (list.type === "favorite") dispatch(favorite(true));
      if (list.type === "later") dispatch(watchLater(true));
    }
    dispatch(fetchedMovie(movie));
    dispatch(loadingMovie(false));
  });
};

export const addToList = (list, movieId, userId) => dispatch => {
  api.movie.addToList(list, movieId, userId).then(res => {
    if (list === "favorite") {
      dispatch(favorite(true));
    } else {
      dispatch(watchLater(true));
    }
  });
};

export const removeFromList = (list, movieId, userId) => dispatch => {
  api.movie.removeFromList(list, movieId, userId).then(() => {
    if (list === "favorite") {
      dispatch(favorite(false));
    } else {
      dispatch(watchLater(false));
    }
  });
};
