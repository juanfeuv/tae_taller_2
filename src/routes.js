import React from "react";

import { createBrowserHistory } from "history";
import { Route, Router, Switch } from 'react-router-dom';

import Home from './screens/Home/Home';
import NotFound from './screens/NotFound/NotFound'

const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="*" component={NotFound} history={history} />
    </Switch>
  </Router>
);

export default Routes;