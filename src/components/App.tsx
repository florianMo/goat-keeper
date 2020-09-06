import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { RouteAndSubRoute, routes } from 'src/routing';

export const colLayout = { xs: { span: 24 }, lg: { span: 20 } };
export const timeFormat = 'HH[h]mm';
export const dateFormat = 'DD/MM/YYYY';

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
