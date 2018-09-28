import axios from "axios";
import { API_ROOT } from "./api-config";

export default {
  movie: {
    getMovies: (query, userId) =>
      axios
        .get(`${API_ROOT}/movies?query=${query}&userId=${userId}`)
        .then(res => {
          if (!res.data.success) throw Error(res.data.message);
          return res.data.results;
        }),
    getMovie: (movieId, userId) =>
      axios
        .post(`${API_ROOT}/movies/?movieId=${movieId}&userId=${userId}`)
        .then(res => {
          if (!res.data.success) throw Error(res.data.message);
          return res.data.result;
        }),
    addToList: (type, movieId, userId) =>
      axios
        .post(`${API_ROOT}/movies/list`, { type, movieId, userId })
        .then(res => {
          if (!res.data.success) throw Error(res.data.message);

          return res.data;
        }),
    removeFromList: (type, movieId, userId) =>
      axios
        .delete(
          `${API_ROOT}/movies/list?type=${type}&movieId=${movieId}&userId=${userId}`
        )
        .then(res => {
          if (!res.data.success) throw Error(res.data.message);

          return res.data;
        }),

    fetchActors: movieId =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b8579c1fd967de5bf38fd125a1b4b0bc`
        )
        .then(res => {
          if (res.status !== 200) throw Error("Something went wrong.");

          return res.data.cast;
        })
  }
};
