import dayjs from 'dayjs';

import { GameEvent } from './event';
import { Team } from './team';

export const MAX_SCORE = 99;
export const MIN_SCORE = 0;

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

export const duration = (set: GameSet): number => {
  if (set.events.length < 2) {
    return 0;
  }

  return dayjs(set.events[set.events.length - 1].at).diff(set.events[0].at, 'minute');
};
