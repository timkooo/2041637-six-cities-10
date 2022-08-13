import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Place } from '../../types/place';
import { loadFavorites } from '../api-actions';

type InitialState = {
  favorites: Place[];
  areFavoritesLoaded: boolean;
};

const initialState: InitialState = {
  favorites: [],
  areFavoritesLoaded: false,
};

export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.areFavoritesLoaded = true;
      })
      .addCase(loadFavorites.pending, (state, action) => {
        state.areFavoritesLoaded = false;
      });
  },
});
