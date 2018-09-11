import axios from "axios";
import { API_ROOT } from "./api-config";

export default {
  user: {
    login: credentials =>
      axios.post(`${API_ROOT}/auth`, credentials).then(res => {
        if (!res.data.success) throw Error(res.data.message);
        return res.data;
      }),
    signup: userInfo =>
      axios.post(`${API_ROOT}/signup`, userInfo).then(res => {
        if (!res.data.success) throw Error(res.data.message);
        return res.data;
      })
  }
};
