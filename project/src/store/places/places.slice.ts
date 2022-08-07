import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Place } from '../../types/place';
import { loadPlaces, loadPlaceById, loadNearestPlaces } from '../api-actions';

type InitialState = {
  places: Place[];
  arePlacesLoaded: boolean;
  nearestPlaces: Place[];
  areNearestPlacesLoaded: boolean;
  currentPlace: Place | null;
  isCurrentPlaceLoaded: boolean;
};

const initialState: InitialState = {
  places: [],
  arePlacesLoaded: false,
  nearestPlaces: [],
  areNearestPlacesLoaded: false,
  currentPlace: null,
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
      .addCase(loadNearestPlaces.fulfilled, (state, action) => {
        state.nearestPlaces = action.payload;
        state.areNearestPlacesLoaded = true;
      })
      .addCase(loadNearestPlaces.pending, (state, action) => {
        state.areNearestPlacesLoaded = false;
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
