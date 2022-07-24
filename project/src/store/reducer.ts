import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './action';
import { Cities } from '../const';
import { places } from '../mocks/places';
import { getPlacesByCity } from '../utils';

const initialState = {
  places: places,
  currentCity: Cities.Amsterdam,
  currentPlaces: getPlacesByCity(Cities.Paris, places),
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.currentCity = action.payload.currentCity;
    state.currentPlaces = getPlacesByCity(action.payload.currentCity, places);
  });
});
