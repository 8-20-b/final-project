import { FETCH_COMMENTS, LOADING_COMMENTS } from "./types";
import api from "../services/comment";

export const fetchedComments = comments => {
  return {
    type: FETCH_COMMENTS,
    payload: comments
  };
};

export const loadingComments = bool => {
  return {
    type: LOADING_COMMENTS,
    payload: bool
  };
};

export const fetchComments = movieId => dispatch => {
  dispatch(loadingComments(true));
  api.comment.getComments(movieId).then(comments => {
    dispatch(fetchedComments(comments));
    dispatch(loadingComments(false));
  });
};
