import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import _ from 'lodash';
import { GameEvent, GameEventType } from 'src/models/event';

import { Game } from '../../models/game';

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
    incrementTeam1: (state: GameState, action: PayloadAction<{ game: Game; set: number }>): void => {
      const game = _.cloneDeep(action.payload.game);
      game.sets[action.payload.set].team1Score++;
      game.sets[action.payload.set].events.push({
        type: GameEventType.T1_SCORE_INCREMENT,
        at: dayjs().format(),
      });
      gameAdapter.updateOne(state, { id: game.id, changes: game });
    },
    incrementTeam2: (state: GameState, action: PayloadAction<{ game: Game; set: number }>): void => {
      const game = _.cloneDeep(action.payload.game);
      game.sets[action.payload.set].team2Score++;
      game.sets[action.payload.set].events.push({
        type: GameEventType.T2_SCORE_INCREMENT,
        at: dayjs().format(),
      });
      gameAdapter.updateOne(state, { id: game.id, changes: game });
    },
    decrementTeam1: (state: GameState, action: PayloadAction<{ game: Game; set: number }>): void => {
      if (action.payload.game.sets[action.payload.set].team1Score > 0) {
        const game = _.cloneDeep(action.payload.game);
        game.sets[action.payload.set].team1Score--;
        game.sets[action.payload.set].events.push({
          type: GameEventType.T1_SCORE_DECREMENT,
          at: dayjs().format(),
        });
        gameAdapter.updateOne(state, { id: game.id, changes: game });
      }
    },
    decrementTeam2: (state: GameState, action: PayloadAction<{ game: Game; set: number }>): void => {
      if (action.payload.game.sets[action.payload.set].team2Score > 0) {
        const game = _.cloneDeep(action.payload.game);
        game.sets[action.payload.set].team2Score--;
        game.sets[action.payload.set].events.push({
          type: GameEventType.T2_SCORE_DECREMENT,
          at: dayjs().format(),
        });
        gameAdapter.updateOne(state, { id: game.id, changes: game });
      }
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
  },
});

export const {
  addEvent,
  addGame,
  addSet,
  decrementTeam1,
  decrementTeam2,
  incrementTeam1,
  incrementTeam2,
} = gameSlice.actions;
