import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { RouteAndSubRoute, routes } from 'src/routing';

export const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <RouteAndSubRoute key={index} {...route} />
        ))}
      </Switch>
    </Router>
  );
};
