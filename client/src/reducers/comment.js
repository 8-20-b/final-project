import { FETCH_COMMENTS, LOADING_COMMENTS } from "../actions/types";

const initialState = {
  comments: [],
  loadingComments: false
};

export const comment = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case LOADING_COMMENTS:
      return {
        ...state,
        loadingComments: action.payload
      };

    default:
      return state;
  }
};
