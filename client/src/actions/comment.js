import {
  FETCHED_COMMENTS,
  LOADING_COMMENTS,
  ADDED_COMMENT,
  UPDATED_COMMENT,
  DELETED_COMMENT
} from "./types";
import api from "../services/comment";

export const loadingComments = bool => {
  return {
    type: LOADING_COMMENTS,
    payload: bool
  };
};

export const fetchedComments = comments => {
  return {
    type: FETCHED_COMMENTS,
    payload: comments
  };
};

export const addedComment = comment => {
  return {
    type: ADDED_COMMENT,
    payload: comment
  };
};

export const updatedComment = comment => {
  return {
    type: UPDATED_COMMENT,
    payload: comment
  };
};

export const removedComment = commentId => {
  return {
    type: DELETED_COMMENT,
    payload: commentId
  };
};

export const fetchComments = movieId => dispatch => {
  dispatch(loadingComments(true));
  api.comment.getComments(movieId).then(comments => {
    dispatch(fetchedComments(comments));
    dispatch(loadingComments(false));
  });
};

export const addComment = (comment, movieId, userId) => dispatch => {
  dispatch(loadingComments(true));
  api.comment.addComment(comment, movieId, userId).then(comment => {
    dispatch(addedComment(comment));
    dispatch(loadingComments(false));
  });
};

export const updateComment = (comment, commentId) => dispatch => {
  dispatch(loadingComments(true));
  api.comment.updateComment(comment, commentId).then(() => {
    dispatch(updatedComment({ comment, commentId }));
    dispatch(loadingComments(false));
  });
};

export const removeComment = commentId => dispatch => {
  dispatch(loadingComments(true));
  api.comment.removeComment(commentId).then(id => {
    dispatch(removedComment(id));
    dispatch(loadingComments(false));
  });
};
