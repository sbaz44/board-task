import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./assets/master.scss";
import Home from "./View/Home";
import ViewDetail from "./View/ViewDetail";
import axios from "axios";
import Favorite from "./View/Favorite";
import Statistics from "./View/Statistics";
axios.defaults.baseURL = "https://app.ticketmaster.com/discovery/v2/"; // the prefix of the URL
axios.defaults.headers.get["Accept"] = "application/json"; // default header for all get request
axios.defaults.headers.post["Accept"] = "application/json";

class Routes extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:type/:idee" component={ViewDetail} exact strict />
          <Route path="/favorites" component={Favorite} exact strict />
          <Route path="/statistics" component={Statistics} exact strict />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
