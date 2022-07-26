import { createReducer, createSelector } from '@reduxjs/toolkit';
import { changeCity } from './action';
import { Cities } from '../const';
import { places } from '../mocks/places';
import { getPlacesByCity } from '../utils';
import { RootState } from '../types/state';

const selectPlaces = (state: RootState) => state.places;
const selectCurrentCity = (state: RootState) => state.currentCity;

export const selectCurrentPlaces = createSelector(
  [selectPlaces, selectCurrentCity],
  (placess, currentCity) => getPlacesByCity(currentCity, placess)
);

const initialState = {
  places,
  currentCity: Cities.Paris,
  currentPlaces: getPlacesByCity(Cities.Paris, places),
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.currentCity = action.payload.currentCity;
  });
});
