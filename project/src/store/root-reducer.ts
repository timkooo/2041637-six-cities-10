import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { applicationSlice } from './application/application.slice';
import { commentsSlice } from './comments/comments.slice';
import { favoritesSlice } from './favorites/favorites.slice';
import { placesSlice } from './places/places.slice';
import { userSlice } from './user/user.slice';

export const rootReducer = combineReducers({
  [NameSpace.Application]: applicationSlice.reducer,
  [NameSpace.Places]: placesSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Comments]: commentsSlice.reducer,
  [NameSpace.Favorites]: favoritesSlice.reducer,
});
