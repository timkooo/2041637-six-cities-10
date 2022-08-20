import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoutes, NameSpace } from '../const';
import { Place } from '../types/place';
import { api } from '../services/api';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { redirectToRoute, updatePlacesAction } from './action';
import { Comment } from '../types/comment';
import { CommentData } from '../types/comment-data';

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
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
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

export const loadCommentsByPlaceId = createAsyncThunk(
  `${NameSpace.Comments}/loadCommentsByPlaceId`,
  async (placeId: string) => {
    const { data } = await api.get<Comment[]>(
      `${APIRoute.Comments}/${placeId}`
    );
    return data;
  }
);

export const postCommentAction = createAsyncThunk(
  `${NameSpace.Comments}/postComment`,
  async ({ formData, placeId }: { formData: CommentData; placeId: string }) => {
    const { data } = await api.post<Comment[]>(
      `${APIRoute.Comments}/${placeId}`,
      formData
    );
    return data;
  }
);

export const loadFavorites = createAsyncThunk(
  `${NameSpace.Favorites}/loadFavorites`,
  async () => {
    const { data } = await api.get<Place[]>(APIRoute.Favorite);
    return data;
  }
);

export const changeFavoriteStatus = createAsyncThunk(
  `${NameSpace.Favorites}/changeFavoriteStatus`,
  async (
    { placeId, status }: { placeId: number; status: number },
    { dispatch }
  ) => {
    const { data } = await api.post<Place>(
      `${APIRoute.Favorite}/${placeId}/${status}`
    );
    dispatch(updatePlacesAction(data));
    dispatch(loadFavorites());
  }
);
