import { makeFakeComments } from '../../utils/mocks';
import { loadFavorites } from '../api-actions';
import { favoritesSlice } from '../favorites/favorites.slice';

const favorites = makeFakeComments();

describe('Reducer: commentsSlice', () => {
  it('should update favorites by load favorites', () => {
    const state = { favorites: [],
      areFavoritesLoaded: false, };
    expect(
      favoritesSlice.reducer(state, {
        type: loadFavorites.fulfilled.type,
        payload: favorites,
      })
    ).toEqual({ favorites, areFavoritesLoaded: true });
  });
});


