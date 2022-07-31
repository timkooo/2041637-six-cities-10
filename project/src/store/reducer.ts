import { createReducer, createSelector } from '@reduxjs/toolkit';
import { changeCity, changeSorting, loadPlaces, setDataLoadedStatus } from './action';
import { Cities } from '../const';
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
  currentCity: Cities,
  currentSorting: SortingTypes,
  isDataLoaded: boolean,
}

const initialState: InitialState = {
  places: [],
  currentCity: Cities.Paris,
  currentSorting: SortingTypes.Popular,
  isDataLoaded: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload.currentCity;
    })
    .addCase(changeSorting, (state, action) => {
      state.currentSorting = action.payload.currentSorting;
    })
    .addCase(loadPlaces, (state, action) => {
      state.places = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});
