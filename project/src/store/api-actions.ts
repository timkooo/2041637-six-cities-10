import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, NameSpace } from '../const';
import { Hotel } from '../types/hotel';
//import { api } from './store';

let api: AxiosInstance;

export const injectAPI = (_api: AxiosInstance) => { api = _api; };

export const loadPlaces = createAsyncThunk(`${NameSpace.Places}/loadPlaces`, async () => {
  const { data } = await api.get<Hotel[]>(APIRoute.Places);
  return data;
});

export const loadPlaceById = createAsyncThunk(
  `${NameSpace.Places}/loadPlacesById`,
  async (hotelId: string | undefined) => {
    const { data } = await api.get<Hotel>(`${APIRoute.Places}/${hotelId}`);
    return data;
  }
);
