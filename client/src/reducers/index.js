import { combineReducers } from "redux";
import { user } from "./user";
import { movie } from "./movie";
import { comment } from "./comment";

export default combineReducers({ user, movie, comment });
