import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP } from "./types";
import api from "../services/user";

export const userLoggedIn = user => {
  return {
    type: USER_LOGGED_IN,
    user
  };
};

export const userLoggedOut = () => {
  return {
    type: USER_LOGGED_OUT
  };
};

export const userSignedUp = userInfo => {
  return {
    type: USER_SIGNED_UP,
    user: userInfo
  };
};

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));

export const logout = () => dispatch => {
  localStorage.removeItem("JWT");
  dispatch(userLoggedOut());
};

export const signup = userInfo => dispatch =>
  api.user.signup(userInfo).then(user => dispatch(userSignedUp(user)));
