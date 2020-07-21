import dayjs from 'dayjs';
import { GameEvent } from 'src/models/event';
import { Team } from 'src/models/team';

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

export const displayName = (game: Game): string => game.team1.name + ' vs ' + game.team2.name;

export const duration = (set: GameSet): number => {
  if (set.events.length < 2) {
    return 0;
  }

  return dayjs(set.events[set.events.length - 1].at).diff(set.events[0].at, 'minute');
};

export const sortGames = (game1: Game, game2: Game): number =>
  (game1.team1.name + game1.team2.name).localeCompare(game2.team1.name + game2.team2.name);

export const countEvents = (game: Game): number => game.sets.reduce((total, set) => total + set.events.length, 0);
