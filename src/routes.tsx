import Home from './components/Home';
import NewGame from './components/NewGame';

export interface RouteConfig {
  path: string;
  exact?: boolean;
  component?: any;
  redirectTo?: string;
  routes?: RouteConfig[];
}

export interface MenuElement {
  path?: string;
  textKey?: string;
  icon?: JSX.Element;
  weight?: number;
  children?: MenuElement[];
}

export const Urls = {
  HOME: '/home',
  NEW_GAME: '/new-game',
  GAME_HISTORY: '/game-history',
  DEFAULT: '/:anything_else',
};

export const routes: RouteConfig[] = [
  {
    path: Urls.HOME,
    exact: true,
    component: Home,
  },
  {
    path: Urls.NEW_GAME,
    exact: true,
    component: NewGame,
  },
  {
    path: Urls.DEFAULT,
    redirectTo: Urls.HOME,
  },
  {
    path: '',
    exact: true,
    redirectTo: Urls.HOME,
  },
];

interface UrlParameter {
  parameter: string;
  value: any;
}
