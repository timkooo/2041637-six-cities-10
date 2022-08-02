import { createAction } from '@reduxjs/toolkit';
import { Hotel } from '../types/hotel';

export const changeCity = createAction('main/changeCity', (city) => ({
  payload: {
    currentCity: city,
  }
}));

export const changeSorting = createAction('main/changeСurrentSorting', (sorting) => ({
  payload: {
    currentSorting: sorting,
  }
}));

export const loadPlaces = createAction<Hotel[]>('data/loadPlaces');

export const setAreHotelsLoaded = createAction<boolean>('data/setAreHotelsLoaded');

export const setCurrentPlace = createAction<Hotel>('data/setCurrentHotel');

export const setIsCurrentPlaceLoaded = createAction<boolean>('data/isCurrentPlaceLoaded');
