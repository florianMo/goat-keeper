import dayjs from 'dayjs';
import { GameEvent, GameEventType, Player, Team } from 'src/models';
import { v4 as uuidv4 } from 'uuid';

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

export const generateDemoGame = (): Game => {
  const gameEvents = [
    GameEventType.ACE,
    GameEventType.ATTACK,
    GameEventType.BLOCK,
    GameEventType.DIG,
    GameEventType.PASS,
    GameEventType.RECEPTION,
    GameEventType.SERVICE,
  ];

  const frenchTeam: Player[] = [
    { name: 'Jenia Grebennikov', number: 1 },
    { name: 'Jean Patry', number: 2 },
    { name: 'Benjamin Toniutti', number: 3 },
    { name: 'Kévin Tillie', number: 3 },
    { name: 'Julien Lyneel', number: 4 },
    { name: 'Earvin Ngapeth', number: 5 },
    { name: 'Kévin Le Roux', number: 6 },
    { name: 'Antoine Brizard', number: 7 },
    { name: 'Stephen Boyer', number: 8 },
    { name: 'Nicolas Le Goff', number: 9 },
    { name: 'Daryl Bultor', number: 10 },
    { name: 'Trévor Clévenot', number: 11 },
    { name: 'Thibault Rossard', number: 12 },
    { name: 'Barthélémy Chinenyeze', number: 13 },
  ];

  const game: Game = {
    id: uuidv4(),
    at: dayjs().format(),
    team1: { name: 'France', players: frenchTeam },
    team2: { name: 'Slovénie', players: [] },
    sets: [],
  };

  let currentTime = dayjs();
  let setIndex = 0;
  do {
    game.sets.push({ team1Score: 0, team2Score: 0, events: [], at: currentTime.format() });

    do {
      // generate between 1 and 8 random game event, separated by [5-20] seconds
      let nbEvents = getRandomBetween(1, 10);

      do {
        game.sets[setIndex].events.push({
          player: frenchTeam[getRandomBetween(0, frenchTeam.length - 1)],
          type: gameEvents[getRandomBetween(0, gameEvents.length - 1)],
          positive: Math.random() < 0.8,
          at: currentTime.format(),
        });

        currentTime = currentTime.add(getRandomBetween(5, 20), 'second');
        nbEvents--;
      } while (nbEvents > 0);

      // generate scoring event
      if (Math.random() < 0.5) {
        game.sets[setIndex].team1Score++;
        game.sets[setIndex].events.push({
          type: GameEventType.T1_SCORE_UPDATE,
          value: game.sets[setIndex].team1Score,
          at: currentTime.format(),
        });
      } else {
        game.sets[setIndex].team2Score++;
        game.sets[setIndex].events.push({
          type: GameEventType.T2_SCORE_UPDATE,
          value: game.sets[setIndex].team2Score,
          at: currentTime.format(),
        });
      }
    } while (
      // this may generate impossible things like useless 4th/5th set or scores like 25-24, not important
      (setIndex < 4 && game.sets[setIndex].team1Score < 25 && game.sets[setIndex].team2Score < 25) ||
      (setIndex === 4 && game.sets[setIndex].team1Score < 15 && game.sets[setIndex].team2Score < 15)
    );

    currentTime = currentTime.add(getRandomBetween(5, 30), 'second');
    setIndex++;
  } while (setIndex < 5);

  return game;
};

export const getRandomBetween = (min: number, max: number): number => +(Math.random() * (max - min) + min).toFixed(0);
