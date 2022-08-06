import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { applicationSlice } from './application/application.slice';
import { placesSlice } from './places/places.slice';
import { userSlice } from './user/user.slice';

export const rootReducer = combineReducers({
  [NameSpace.Application]: applicationSlice.reducer,
  [NameSpace.Places]: placesSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});
