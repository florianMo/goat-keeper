import { Team } from './team';

export interface Game {
  id: string;
  team1: Team;
  team2: Team;
  created: string;
}
