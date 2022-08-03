import { createReducer, createSlice } from '@reduxjs/toolkit';
import { Cities, NameSpace, SortingTypes } from '../../const';
import { changeCity, changeSorting } from '../action';

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
    reducer: createReducer(initialState, (builder) => {
      builder
        .addCase(changeCity, (state, action) => {
          state.currentCity = action.payload.currentCity;
        })
        .addCase(changeSorting, (state, action) => {
          state.currentSorting = action.payload.currentSorting;
        });
    }),
  },
});
