import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoutes, NameSpace } from '../const';
import { Place } from '../types/hotel';
import { api } from '../services/api';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './action';

export const loadPlaces = createAsyncThunk(
  `${NameSpace.Places}/loadPlaces`,
  async () => {
    const { data } = await api.get<Place[]>(APIRoute.Places);
    return data;
  }
);

export const loadPlaceById = createAsyncThunk(
  `${NameSpace.Places}/loadPlaceById`,
  async (placeId: string) => {
    const { data } = await api.get<Place>(`${APIRoute.Places}/${placeId}`);
    return data;
  }
);

export const loadNearestPlaces = createAsyncThunk(
  `${NameSpace.Places}/loadNearestPlaces`,
  async (placeId: string) => {
    const { data } = await api.get<Place[]>(
      `${APIRoute.Places}/${placeId}/nearby`
    );
    return data;
  }
);

export const checkAuthAction = createAsyncThunk(
  `${NameSpace.User}/checkAuth`,
  async () => {
    await api.get(APIRoute.Login);
  }
);

export const loginAction = createAsyncThunk(
  `${NameSpace.User}/login`,
  async (login: AuthData, { dispatch }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, login);
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoutes.Main));
    return data;
  }
);

export const logoutAction = createAsyncThunk(
  `${NameSpace.User}/logout`,
  async () => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
