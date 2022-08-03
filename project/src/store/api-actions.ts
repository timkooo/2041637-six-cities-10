import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, NameSpace } from '../const';
import { Hotel } from '../types/hotel';
import { api } from '../services/api';

export const loadPlaces = createAsyncThunk(`${NameSpace.Places}/loadPlaces`, async () => {
  const { data } = await api.get<Hotel[]>(APIRoute.Places);
  return data;
});

export const loadPlaceById = createAsyncThunk(
  `${NameSpace.Places}/loadPlaceById`,
  async (placeId: string) => {
    const { data } = await api.get<Hotel>(`${APIRoute.Places}/${placeId}`);
    return data;
  }
);

export const loadNearestPlaces = createAsyncThunk(
  `${NameSpace.Places}/loadNearestPlaces`,
  async (placeId: string) => {
    const { data } = await api.get<Hotel[]>(`${APIRoute.Places}/${placeId}/nearby`);
    return data;
  }
);
