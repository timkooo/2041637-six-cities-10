import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { getPlacesByCity } from '../../utils';
import { RootState } from '../../types/store';
import { SortingTypes, sortingToFunction } from '../../const';
import {
  selectCurrentCity,
  selectCurrentSorting,
} from '../application/application.selectors';

const selectPlaces = (state: RootState) => state[NameSpace.Places].places;
export const selectArePlacesLoaded = (state: RootState) =>
  state[NameSpace.Places].arePlacesLoaded;

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

export const selectCurrentPlace = (state: RootState) => state[NameSpace.Places].currentPlace;
export const selectIsCurrentPlaceLoaded = (state: RootState) => state[NameSpace.Places].isCurrentPlaceLoaded;
export const selectNearestPlaces = (state: RootState) => state[NameSpace.Places].nearestPlaces;
export const selectAreNearestPlacesLoaded = (state: RootState) => state[NameSpace.Places].areNearestPlacesLoaded;
