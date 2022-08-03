import { createSlice } from '@reduxjs/toolkit';
import { Cities, NameSpace, SortingTypes } from '../../const';

type InitialState = {
  currentCity: Cities;
  currentSorting: SortingTypes;
};

const initialState: InitialState = {
  currentCity: Cities.Paris,
  currentSorting: SortingTypes.Popular,
};

export const applicationSlice = createSlice({
  name: NameSpace.Application,
  initialState,
  reducers: {
    changeCity(state, action) {
      state.currentCity = action.payload;
    },
    changeSorting(state, action) {
      state.currentSorting = action.payload;
    },
  },
});

export const {changeCity, changeSorting} = applicationSlice.actions;
