import { Cities, SortingTypes } from '../../const';
import { applicationSlice, changeCity, changeSorting } from './application.slice';

describe('Reducer: applicationSlice', () => {
  it('should set the current city', () => {
    const state = {
      currentCity: Cities.Paris,
      currentSorting: SortingTypes.Popular
    };
    expect(
      applicationSlice.reducer(state, changeCity(Cities.Amsterdam))
    ).toEqual({ currentCity: Cities.Amsterdam, currentSorting: SortingTypes.Popular});
  });

  it('should set the current sorting', () => {
    const state = {
      currentCity: Cities.Paris,
      currentSorting: SortingTypes.Popular
    };
    expect(
      applicationSlice.reducer(state, changeSorting(SortingTypes.PriceHighToLow))
    ).toEqual({ currentCity: Cities.Paris, currentSorting: SortingTypes.PriceHighToLow});
  });
});
