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
        })
  }
};
