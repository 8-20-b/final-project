import {
  FETCH_MOVIES,
  FETCH_MOVIE,
  LOADING_MOVIES,
  LOADING_MOVIE,
  FAVORITE,
  WATCH_LATER
} from "../actions/types";

const initialState = {
  movies: [],
  movie: {},
  loadingMovies: false,
  loadingMovie: false,
  favorite: false,
  watchLater: false
};

export const movie = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload
      };
    case LOADING_MOVIES:
      return {
        ...state,
        moviesLoading: action.payload
      };
    case LOADING_MOVIE:
      return {
        ...state,
        movieLoading: action.payload
      };
    case FAVORITE:
      return {
        ...state,
        favorite: action.payload
      };
    case WATCH_LATER:
      return {
        ...state,
        watchLater: action.payload
      };
    default:
      return state;
  }
};
