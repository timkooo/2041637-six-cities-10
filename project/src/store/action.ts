import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('main/changeCity', (city) => ({
  payload: {
    currentCity: city,
  }
}));

