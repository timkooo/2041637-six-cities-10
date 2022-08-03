import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Hotel } from '../../types/hotel';
import { loadPlaces, loadPlaceById } from '../api-actions';

type InitialState = {
  places: Hotel[],
  arePlacesLoaded: boolean,
  currentPlace: Hotel | Record<string, never>,
  isCurrentPlaceLoaded: boolean,
}

const initialState: InitialState = {
  places: [],
  arePlacesLoaded: false,
  currentPlace: {},
  isCurrentPlaceLoaded: false,
};

export const placesSlice = createSlice({
  name: NameSpace.Places,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadPlaces.fulfilled, (state, action) => {
        state.places = action.payload;
        state.arePlacesLoaded = true;
      })
      .addCase(loadPlaces.pending, (state, action) => {
        state.arePlacesLoaded = false;
      })
      .addCase(loadPlaceById.fulfilled, (state, action) => {
        state.currentPlace = action.payload;
        state.isCurrentPlaceLoaded = true;
      })
      .addCase(loadPlaceById.pending, (state, action) => {
        state.isCurrentPlaceLoaded = false;
      });
  },
});
