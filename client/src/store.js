import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import { routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";
const middleware = [thunk];
const initialState = {};
//const mware = routerMiddleware(history);
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
