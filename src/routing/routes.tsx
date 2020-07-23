import { GameList } from 'src/components/Pages/GameList/GameList';
import { Home } from 'src/components/Pages/Home/Home';
import { NewGame } from 'src/components/Pages/NewGame/NewGame';
import { Game } from 'src/components/Pages/ScoreBoard/Game';
import { GameStats } from 'src/components/Pages/Stats/GameStats';
import { TeamManagement } from 'src/components/Pages/TeamManagement/TeamManagement';

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
  HOME: process.env.PUBLIC_URL + '/home',
  NEW_GAME: process.env.PUBLIC_URL + '/new-game',
  GAME_LIST: process.env.PUBLIC_URL + '/game-list',
  GAME: process.env.PUBLIC_URL + '/game/:id',
  GAME_STATS: process.env.PUBLIC_URL + '/game/:id/stats',
  TEAM_MANAGEMENT: process.env.PUBLIC_URL + '/game/:id/team',
  DEFAULT: process.env.PUBLIC_URL + '/:anything_else',
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
    path: Urls.GAME,
    exact: true,
    component: Game,
  },
  {
    path: Urls.GAME_LIST,
    exact: true,
    component: GameList,
  },
  {
    path: Urls.GAME_STATS,
    exact: true,
    component: GameStats,
  },
  {
    path: Urls.TEAM_MANAGEMENT,
    exact: true,
    component: TeamManagement,
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

export const buildUrl = (base: string, parameters: UrlParameter[]): string => {
  parameters.map((param: UrlParameter) => {
    base = base.replace(':' + param.parameter, param.value.toString());
    return null;
  });

  return base;
};
