import { createBrowserHistory } from 'history';
import React from 'react';
import ReactGa from 'react-ga';
import { Router, Switch } from 'react-router-dom';
import { RouteAndSubRoute, routes } from 'src/routing';

export const colLayout = { xs: { span: 24 }, lg: { span: 20 } };
export const timeFormat = 'HH[h]mm';
export const dateFormat = 'DD/MM/YYYY';

ReactGa.initialize('UA-177395149-1');

export const App = (): JSX.Element => {
  const history = createBrowserHistory();
  history.listen((location) => {
    ReactGa.set({ page: location.pathname });
    ReactGa.pageview(location.pathname);
  });

  return (
    <Router history={history}>
      <Switch>
        {routes.map((route, index) => (
          <RouteAndSubRoute key={index} {...route} />
        ))}
      </Switch>
    </Router>
  );
};
