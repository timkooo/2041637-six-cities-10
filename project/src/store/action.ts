import { createAction } from '@reduxjs/toolkit';
import {AppRoutes} from '../const';

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

export const redirectToRoute = createAction<AppRoutes>('application/redirectToRoute');
