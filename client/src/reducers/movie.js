import {
  FETCH_MOVIES,
  FETCH_MOVIE,
  LOADING_MOVIES,
  LOADING_MOVIE
} from "../actions/types";

const initialState = {
  movies: [],
  movie: {},
  loadingMovies: false,
  loadingMovie: false
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
    default:
      return state;
  }
};
