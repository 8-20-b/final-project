import {
  FETCH_MOVIES,
  FETCH_MOVIE,
  LOADING_MOVIES,
  LOADING_MOVIE,
  FAVORITE,
  WATCH_LATER,
  FETCH_ACTORS,
  LOADING_ACTORS
} from "../actions/types";

const initialState = {
  movies: [],
  movie: {},
  actors: [],
  loadingMovies: false,
  loadingMovie: false,
  favorite: false,
  watchLater: false,
  loadingActors: false
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
        loadingMovies: action.payload
      };
    case LOADING_MOVIE:
      return {
        ...state,
        loadingMovie: action.payload
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
    case FETCH_ACTORS:
      return {
        ...state,
        actors: action.payload
      };
    case LOADING_ACTORS:
      return {
        ...state,
        loadingActors: action.payload
      };
    default:
      return state;
  }
};
