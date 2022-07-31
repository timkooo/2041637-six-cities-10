import { createReducer, createSelector } from '@reduxjs/toolkit';
import { changeCity, changeSorting } from './action';
import { Cities } from '../const';
import { places } from '../mocks/places';
import { getPlacesByCity } from '../utils';
import { RootState } from '../types/store';
import { SortingTypes, sortingToFunction } from '../const';
import { Hotel } from '../types/hotel';

const selectPlaces = (state: RootState) => state.places;
const selectCurrentCity = (state: RootState) => state.currentCity;
export const selectCurrentSorting = (state: RootState) => state.currentSorting;

export const selectCurrentPlaces = createSelector(
  [selectPlaces, selectCurrentCity, selectCurrentSorting],
  (placesAll, currentCity, currentSorting) => {
    if (currentSorting === SortingTypes.Popular) {
      return getPlacesByCity(currentCity, placesAll);
    }
    return getPlacesByCity(currentCity, placesAll).sort(
      sortingToFunction[SortingTypes[currentSorting]]
    );
  }
);

type InitialState = {
  places: Hotel[],
  currentCity: keyof typeof Cities,
  currentSorting: keyof typeof SortingTypes,
}

const initialState: InitialState = {
  places,
  currentCity: Cities.Paris,
  currentSorting: SortingTypes.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload.currentCity;
    })
    .addCase(changeSorting, (state, action) => {
      state.currentSorting = action.payload.currentSorting;
    });
});
