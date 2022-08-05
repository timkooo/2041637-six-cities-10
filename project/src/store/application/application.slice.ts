import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    changeCity(state, action: PayloadAction<Cities>) {
      state.currentCity = action.payload;
    },
    changeSorting(state, action: PayloadAction<SortingTypes>) {
      state.currentSorting = action.payload;
    },
  },
});

export const {changeCity, changeSorting} = applicationSlice.actions;
