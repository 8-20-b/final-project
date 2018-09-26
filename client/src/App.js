import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import { Results, Movie, Movies, Login, Register } from "./containers/";

import "./App.css";

const App = () => (
  <Router>
    <React.Fragment>
      <Header brand="Movie Reviews" />
      <Route
        exact
        path="/"
        render={() => <Redirect to="/movies/recently-added" />}
      />
      <Route exact path="/movies/:query" component={Movies} />
      <Route exact path="/movie/:movie_id" component={Movie} />
      <Route exact path="/results/:query" component={Results} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </React.Fragment>
  </Router>
);

export default App;
