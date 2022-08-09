import { createAction } from '@reduxjs/toolkit';
import {AppRoutes} from '../const';

export const changeCity = createAction('application/changeCity', (city) => ({
  payload: {
    currentCity: city,
  }
}));

export const changeSorting = createAction('application/changeСurrentSorting', (sorting) => ({
  payload: {
    currentSorting: sorting,
  }
}));

export const redirectToRoute = createAction<AppRoutes>('application/redirectToRoute');
