import { GameList } from 'src/components/Pages/GameList/GameList';
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

export const Urls = {
  NEW_GAME: '/new-game',
  GAME_LIST: '/game-list',
  GAME: '/game/:id',
  GAME_STATS: '/game/:id/stats',
  TEAM_MANAGEMENT: '/game/:id/team',
  DEFAULT: '/:anything_else',
};

export const routes: RouteConfig[] = [
  { path: Urls.NEW_GAME, exact: true, component: NewGame },
  { path: Urls.GAME, exact: true, component: Game },
  { path: Urls.GAME_LIST, exact: true, component: GameList },
  { path: Urls.GAME_STATS, exact: true, component: GameStats },
  { path: Urls.TEAM_MANAGEMENT, exact: true, component: TeamManagement },
  { path: Urls.DEFAULT, redirectTo: Urls.GAME_LIST },
  { path: '', exact: true, redirectTo: Urls.GAME_LIST },
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
