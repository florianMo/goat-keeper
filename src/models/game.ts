import { GameEvent } from './event';
import { Team } from './team';

export interface Game {
  id: string;
  team1: Team;
  team2: Team;
  sets: GameSet[];
  at: string;
}

export interface GameSet {
  team1Score: number;
  team2Score: number;
  events: GameEvent[];
  at: string;
}
