import React from 'react';
import { Redirect, Route, SwitchProps } from 'react-router-dom';
import { RouteConfig } from 'src/routing';

export const RouteAndSubRoute: React.FC<SwitchProps & RouteConfig> = (route) => {
  if (route.redirectTo) {
    return <Route path={route.path} render={(): any => <Redirect to={route.redirectTo as string} />} />;
  }

  return <Route path={route.path} render={(props: any): any => <route.component {...props} routes={route.routes} />} />;
};
