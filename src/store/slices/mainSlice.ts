import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import { Game } from '../../models/game';

export const mainAdapter = createEntityAdapter<Game>();

export interface MainState extends EntityState<Game> {
  total: number;
}

export const mainInitialState: MainState = {
  ...mainAdapter.getInitialState(),
  total: 0,
};

export const mainSlice = createSlice({
  name: 'journeyScopes',
  initialState: mainInitialState,
  reducers: {
    addGame: (state: MainState, action: PayloadAction<Game>): void => {
      mainAdapter.addOne(state, action.payload);
    },
  },
});

export const { addGame } = mainSlice.actions;
