import { createSelector } from 'reselect';
import { NameSpace, Cities } from '../../const';
import { Place } from '../../types/place';
import { RootState } from '../../types/store';

export const selectFavorites = (state: RootState) => state[NameSpace.Favorites].favorites;
export const selectAreFavoritesLoaded = (state: RootState) => state[NameSpace.Favorites].areFavoritesLoaded;
export const selectFavoritesSorted = createSelector(selectFavorites, (favorites) => {
  const sortedFavorites: Record<string, Place[]> = {
    [Cities.Paris] : [],
    [Cities.Cologne] : [],
    [Cities.Brussels] : [],
    [Cities.Amsterdam] : [],
    [Cities.Hamburg] : [],
    [Cities.Dusseldorf] : [],
  };
  favorites.map((favorite) => sortedFavorites[favorite.city.name].push(favorite));
  return sortedFavorites;
});
export const selectFavoritesNumber = createSelector(selectFavorites, (favorites) => favorites.length);
