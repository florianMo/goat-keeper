import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import RouteAndSubRoute from '../RouteAndSubRoute';
import { routes } from '../routes';

const App = (): JSX.Element => {
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

export default App;
