import { makeFakePlace, makeFakePlaces } from '../../utils/mocks';
import { updatePlacesAction } from '../action';
import { loadNearestPlaces, loadPlaceById, loadPlaces } from '../api-actions';
import { InitialState, placesSlice } from '../places/places.slice';

const places = makeFakePlaces();
const currentPlace = makeFakePlace();

describe('Reducer: placesSlice', () => {

  let state : InitialState;

  beforeEach(() => {
    state = {
      places: [],
      arePlacesLoaded: false,
      nearestPlaces: [],
      areNearestPlacesLoaded: false,
      currentPlace: null,
      isCurrentPlaceLoaded: false,
    };
  });

  it('should update places by load places', () => {
    expect(
      placesSlice.reducer(state, {
        type: loadPlaces.fulfilled.type,
        payload: places,
      })
    ).toEqual({
      places: places,
      arePlacesLoaded: true,
      nearestPlaces: [],
      areNearestPlacesLoaded: false,
      currentPlace: null,
      isCurrentPlaceLoaded: false,
    });
  });

  it('should update nearest places by load nearest places', () => {
    expect(
      placesSlice.reducer(state, {
        type: loadNearestPlaces.fulfilled.type,
        payload: places,
      })
    ).toEqual({
      places: [],
      arePlacesLoaded: false,
      nearestPlaces: places,
      areNearestPlacesLoaded: true,
      currentPlace: null,
      isCurrentPlaceLoaded: false,
    });
  });

  it('should update current place by place id', () => {
    expect(
      placesSlice.reducer(state, {
        type: loadPlaceById.fulfilled.type,
        payload: currentPlace,
      })
    ).toEqual({
      places: [],
      arePlacesLoaded: false,
      nearestPlaces: [],
      areNearestPlacesLoaded: false,
      currentPlace: currentPlace,
      isCurrentPlaceLoaded: true,
    });
  });

  it('should update places and current place by place id', () => {
    const oldPlaces = [...places, currentPlace];
    const updatedPlace = {...currentPlace};
    updatedPlace.isFavorite = !currentPlace.isFavorite;
    const updatedPlaces = [...places, updatedPlace];
    const fakeCurrentPlace = makeFakePlace();
    const state2 = {
      places: oldPlaces,
      arePlacesLoaded: false,
      nearestPlaces: [],
      areNearestPlacesLoaded: false,
      currentPlace: fakeCurrentPlace,
      isCurrentPlaceLoaded: false,
    };
    expect(
      placesSlice.reducer(state2, {
        type: updatePlacesAction.type,
        payload: updatedPlace,
      }, )
    ).toEqual({
      places: updatedPlaces,
      arePlacesLoaded: false,
      nearestPlaces: [],
      areNearestPlacesLoaded: false,
      currentPlace: fakeCurrentPlace,
      isCurrentPlaceLoaded: false,
    });
  });

  it('should update only places by place id', () => {
    const oldPlaces = [...places, currentPlace];
    const updatedPlace = {...currentPlace};
    updatedPlace.isFavorite = !currentPlace.isFavorite;
    const updatedPlaces = [...places, updatedPlace];
    const state2 = {
      places: oldPlaces,
      arePlacesLoaded: false,
      nearestPlaces: [],
      areNearestPlacesLoaded: false,
      currentPlace: currentPlace,
      isCurrentPlaceLoaded: false,
    };
    expect(
      placesSlice.reducer(state2, {
        type: updatePlacesAction.type,
        payload: updatedPlace,
      }, )
    ).toEqual({
      places: updatedPlaces,
      arePlacesLoaded: false,
      nearestPlaces: [],
      areNearestPlacesLoaded: false,
      currentPlace: updatedPlace,
      isCurrentPlaceLoaded: false,
    });
  });

});
