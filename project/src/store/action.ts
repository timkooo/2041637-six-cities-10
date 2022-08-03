import { createAction } from '@reduxjs/toolkit';

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
