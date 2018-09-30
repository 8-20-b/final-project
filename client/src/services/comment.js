import axios from "axios";
import { API_ROOT } from "./api-config";

export default {
  comment: {
    getComments: movieId =>
      axios.get(`${API_ROOT}/comments/${movieId}`).then(res => {
        if (!res.data.success) throw Error(res.data.message);

        return res.data.results;
      }),
    addComment: (comment, movieId, userId) =>
      axios
        .post(`${API_ROOT}/comments`, {
          comment,
          movieId,
          userId
        })
        .then(res => {
          if (!res.data.success) throw Error(res.data.message);

          return res.data.result;
        }),
    updateComment: (comment, commentId) =>
      axios
        .put(`${API_ROOT}/comments/${commentId}`, {
          comment
        })
        .then(res => {
          if (!res.data.success) throw Error(res.data.message);

          return res.data.result;
        }),
    removeComment: commentId =>
      axios.delete(`${API_ROOT}/comments/${commentId}`).then(res => {
        if (!res.data.success) throw Error(res.data.message);

        return res.data.result;
      })
  }
};
