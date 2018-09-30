import {
  FETCHED_COMMENTS,
  LOADING_COMMENTS,
  ADDED_COMMENT,
  UPDATED_COMMENT,
  DELETED_COMMENT
} from "../actions/types";

const initialState = {
  comments: [],
  loadingComments: false
};

export const comment = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_COMMENTS:
      return {
        comments: action.payload
      };
    case LOADING_COMMENTS:
      return {
        ...state,
        loadingComments: action.payload
      };
    case ADDED_COMMENT:
      return {
        comments: [action.payload, ...state.comments]
      };
    case UPDATED_COMMENT:
      const objIndex = state.comments.findIndex(
        comment => comment.commentId === action.payload.commentId
      );
      const oldComment = state.comments.filter(
        comment => comment.commentId === action.payload.commentId
      );

      const newComment = (oldComment[objIndex].comment =
        action.payload.comment);

      console.log("reduxState", state.comments);
      console.log("newComment", newComment);
      return {
        ...state,
        comments: [...state.comments, newComment]
      };
    case DELETED_COMMENT:
      const comments = state.comments.filter(
        comment => comment.commentId !== Math.floor(action.payload)
      );
      return {
        ...state,
        comments
      };
    default:
      return state;
  }
};
