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

export const isWon = (game: Game): boolean => {
  return (
    game.sets.filter((set) => set.team1Score > set.team2Score).length >
    game.sets.filter((set) => set.team1Score < set.team2Score).length
  );
};

export const dateFormat = 'DD/MM/YYYY';
