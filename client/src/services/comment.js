import axios from "axios";
import { API_ROOT } from "./api-config";

export default {
  comment: {
    getComments: movieId =>
      axios.get(`${API_ROOT}/comments/${movieId}`).then(res => {
        if (!res.data.success) throw Error(res.data.message);

        return res.data.results;
      })
  }
};
