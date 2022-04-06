import { combineReducers } from "redux";
import { LoginReducer } from "./Reducer/LoginReducer";

export default combineReducers({
  Auth: LoginReducer,
});
