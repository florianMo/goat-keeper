import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { RouteAndSubRoute, routes } from 'src/routing';

export const colLayout = { xs: { span: 24 }, md: { span: 18 }, lg: { span: 14 } };
export const timeFormat = 'HH[h]mm';
export const dateFormat = 'DD/MM/YYYY';

export const App = (): JSX.Element => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        {routes.map((route, index) => (
          <RouteAndSubRoute key={index} {...route} />
        ))}
      </Switch>
    </Router>
  );
};
