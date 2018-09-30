import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import decode from "jwt-decode";
import { userLoggedIn } from "./actions/user";

import rootReducer from "./reducers";

const logger = store => {
  return next => {
    return action => {
      // console.log("[Middleware] Dispatching", action);
      const result = next(action);
      // console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

if (localStorage.getItem("JWT")) {
  const payload = decode(localStorage.getItem("JWT"));

  const user = {
    token: localStorage.getItem("JWT"),
    userId: payload.userId
  };
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
