import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Game } from 'src/models';
import { GameEvent, GameEventType } from 'src/models/event';
import { Player } from 'src/models/player';

export const gameAdapter = createEntityAdapter<Game>();

export interface GameState extends EntityState<Game> {
  total: number;
}

export const gameInitialState: GameState = {
  ...gameAdapter.getInitialState(),
  total: 0,
};

export const gameSlice = createSlice({
  name: 'games',
  initialState: gameInitialState,
  reducers: {
    addGame: (state: GameState, action: PayloadAction<Game>): void => {
      gameAdapter.addOne(state, action.payload);
    },
    deleteGame: (state: GameState, action: PayloadAction<string>): void => {
      gameAdapter.removeOne(state, action.payload);
    },
    addPlayer: (state: GameState, action: PayloadAction<{ game: Game; player: Player }>): void => {
      const game = _.cloneDeep(action.payload.game);
      game.team1.players.push(action.payload.player);
      gameAdapter.updateOne(state, { id: game.id, changes: game });
    },
    deletePlayer: (state: GameState, action: PayloadAction<{ game: Game; playerKey: string }>): void => {
      const game = _.cloneDeep(action.payload.game);
      const playerProperties = action.payload.playerKey.split(':');
      const player: Player = { name: playerProperties[0], number: parseInt(playerProperties[1], 10) };
      game.team1.players = game.team1.players.filter((p) => player.name !== p.name && player.number !== p.number);
      gameAdapter.updateOne(state, { id: game.id, changes: game });
    },
    incrementTeam1: (state: GameState, action: PayloadAction<{ game: Game; set: number }>): void => {
      const game = _.cloneDeep(action.payload.game);
      game.sets[action.payload.set].team1Score++;
      game.sets[action.payload.set].events.push({
        type: GameEventType.T1_SCORE_UPDATE,
        value: game.sets[action.payload.set].team1Score,
        at: dayjs().format(),
      });
      gameAdapter.updateOne(state, { id: game.id, changes: game });
    },
    incrementTeam2: (state: GameState, action: PayloadAction<{ game: Game; set: number }>): void => {
      const game = _.cloneDeep(action.payload.game);
      game.sets[action.payload.set].team2Score++;
      game.sets[action.payload.set].events.push({
        type: GameEventType.T2_SCORE_UPDATE,
        value: game.sets[action.payload.set].team2Score,
        at: dayjs().format(),
      });
      gameAdapter.updateOne(state, { id: game.id, changes: game });
    },
    decrementTeam1: (state: GameState, action: PayloadAction<{ game: Game; set: number }>): void => {
      const game = _.cloneDeep(action.payload.game);
      game.sets[action.payload.set].team1Score--;
      game.sets[action.payload.set].events.push({
        type: GameEventType.T1_SCORE_UPDATE,
        value: game.sets[action.payload.set].team1Score,
        at: dayjs().format(),
      });
      gameAdapter.updateOne(state, { id: game.id, changes: game });
    },
    decrementTeam2: (state: GameState, action: PayloadAction<{ game: Game; set: number }>): void => {
      const game = _.cloneDeep(action.payload.game);
      game.sets[action.payload.set].team2Score--;
      game.sets[action.payload.set].events.push({
        type: GameEventType.T2_SCORE_UPDATE,
        value: game.sets[action.payload.set].team2Score,
        at: dayjs().format(),
      });
      gameAdapter.updateOne(state, { id: game.id, changes: game });
    },
    addSet: (state: GameState, action: PayloadAction<Game>): void => {
      const game = _.cloneDeep(action.payload);
      game.sets.push({ team1Score: 0, team2Score: 0, events: [], at: dayjs().format() });
      gameAdapter.updateOne(state, { id: game.id, changes: game });
    },
    addEvent: (state: GameState, action: PayloadAction<{ game: Game; set: number; event: GameEvent }>): void => {
      const game = _.cloneDeep(action.payload.game);
      game.sets[action.payload.set].events.push(action.payload.event);
      gameAdapter.updateOne(state, { id: game.id, changes: game });
    },
    removeEvent: (state: GameState, action: PayloadAction<{ game: Game; set: number; event: GameEvent }>): void => {
      const game = _.cloneDeep(action.payload.game);
      game.sets[action.payload.set].events = game.sets[action.payload.set].events.filter(
        (e) => !_.isEqual(e, action.payload.event)
      );
      gameAdapter.updateOne(state, { id: game.id, changes: game });
    },
  },
});

export const {
  addEvent,
  addGame,
  addPlayer,
  addSet,
  decrementTeam1,
  decrementTeam2,
  deleteGame,
  deletePlayer,
  incrementTeam1,
  incrementTeam2,
  removeEvent,
} = gameSlice.actions;
