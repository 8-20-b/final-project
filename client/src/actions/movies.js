import { SEARCH_RESULTS } from "./types";

export const searchResults = results => {
  return {
    type: SEARCH_RESULTS,
    results
  };
};

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));
