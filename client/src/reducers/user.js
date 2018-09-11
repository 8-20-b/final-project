import {
  USER_SIGNED_UP,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "../actions/types";

export const user = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_SIGNED_UP:
      return action.user;
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
};
