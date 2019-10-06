import { combineReducers } from "redux";

//import { routerReducer } from "react-router-redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";

export default combineReducers({
  alert,
  auth,
  profile,
  post
});
